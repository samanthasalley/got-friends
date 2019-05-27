/**
 * ************************************
 *
 * @module  gotController
 * @author  samanthasalley
 * @date    2019-05-25
 * @description controller responsible for fetching data from GoT API
 *
 * ************************************
 */

const fetch = require('node-fetch');
const parseHeader = require('parse-link-header');

const dataCache = {};

const baseRequest = {
  url: 'https://anapioficeandfire.com/api/',
  pageSize: 50,
};

const gotController = {};

const fetchAll = async (url, pageSize, lastPage = undefined, curPage = 1, results = []) => {
  if (curPage > lastPage) return results;
  let setLastPage;
  const newFetchURL = `${url}?page=${curPage}&pageSize=${pageSize}`;
  const newData = (curPage !== 1 && dataCache[newFetchURL])
    ? dataCache[newFetchURL]
    : await fetch(newFetchURL)
      .then(data => {
        parsedLinkHeader = parseHeader(data.headers.get('link'));
        setLastPage = parseInt(parsedLinkHeader.last.page);
        return data.json();
      });
  if (!dataCache[newFetchURL]) dataCache[newFetchURL] = newData;
  if (curPage === 1 && setLastPage !== 1 && setLastPage > 3) setLastPage = 3; // TODO: remove this after testing - limiting number of requests for testing
  return fetchAll(url, pageSize, lastPage === undefined ? setLastPage : lastPage, curPage + 1, [...results, ...newData]);
};

const formatIdByURL = (arr, idName) => arr.reduce((formatted, cur) => {
  const splitUrl = cur.url.split('/');
  const id = parseInt(splitUrl[splitUrl.length - 1]);
  const objToStore = { ...cur };
  objToStore[idName] = id;
  formatted.allIds.push(id);
  formatted.byId[id] = objToStore;
  return formatted;
}, { allIds: [], byId: {} });

const concatCharData = (char1, char2) => {
  return {
    charId: char1.charId,
    url: char1.url,
    name: char1.name,
    gender: char1.gender || char2.gender || undefined,
    altIds: char1.altIds ? [...char1.altIds, char2.charId] : [char2.charId],
    familyName: char1.familyName || char2.familyName || undefined,
    allegiances: Object.assign(char1.allegiances, char2.allegiances),
  }
};

const concatHouseData = (house1, house2) => {
  const joinedHouseData = {
    houseId: house1.houseId,
    houseName: house1.houseName,
    url: house1.url,
    name: house1.name,
    altIds: house1.altIds ? [...house1.altIds, house2.houseId] : [house2.houseId],
    altNames: house1.altNames ? [...house1.altNames, house2.name] : [house2.name],
    familyName: house1.familyName || house2.familyName || undefined,
    swornMembers: Object.assign(house1.swornMembers, house2.swornMembers),
    familyMembers: Object.assign(house1.familyMembers, house2.familyMembers),
    allies: Object.assign(house1.allies, house2.allies),
  };
  return joinedHouseData;
};

gotController.fetchCharacters = async (req, res, next) => {
  const charsUrl = `${baseRequest.url}/characters`;
  const allCharacters = await fetchAll(charsUrl, baseRequest.pageSize);
  const filteredAndFormattedCharacters = allCharacters
    .reduce((chars, char) => {
      if (char.name !== '') {
        const splitCharUrl = char.url.split('/');
        const charId = parseInt(splitCharUrl[splitCharUrl.length - 1]);
        const charData = {
          charId,
          url: char.url,
          name: char.name,
          gender: char.gender,
          allegiances: char.allegiances.reduce((houses, houseUrl) => {
            if (houseUrl !== '') {
              const splitHouseUrl = houseUrl.split('/');
              const houseId = parseInt(splitHouseUrl[splitHouseUrl.length - 1]);
              houses[houseId] = true;
            }
            return houses;
          }, {}),
          familyName: char.name.split(' ')[1],
        };
        if (!chars[char.name]) chars[char.name] = charData;
        else chars[char.name] = concatCharData(chars[char.name], charData);
      }
      return chars;
    }, {});
  res.locals.characters = filteredAndFormattedCharacters;
  return next();
};

gotController.fetchHouses = async (req, res, next) => {
  const housesUrl = `${baseRequest.url}/houses`;
  const allHouses = await fetchAll(housesUrl, baseRequest.pageSize);
  const { houses, regions } = allHouses
    .reduce((data, house) => {
      const houseName = house.name.split(' ')[1];
      const splitHouseUrl = house.url.split('/');
      const houseId = parseInt(splitHouseUrl[splitHouseUrl.length - 1]);
      if (house.region !== '' && house.region && houseName) {
        const houseData = {
          houseId,
          houseName,
          url: house.url,
          name: house.name,
          region: house.region,
          words: house.words,
          swornMembers: house.swornMembers.reduce((chars, charUrl) => {
            if (charUrl !== '') {
              const splitCharUrl = charUrl.split('/');
              const charId = parseInt(splitCharUrl[splitCharUrl.length - 1]);
              chars[charId] = true;
            }
            return chars;
          }, {}),
          familyMembers: {},
          allies: {},
        };
        if (!data.regions[house.region]) data.regions[house.region] = { houses: {} };
        data.regions[house.region].houses[houseName] = true;
        if (!data.houses[houseName]) data.houses[houseName] = houseData;
        else data.houses[houseName] = concatHouseData(data.houses[houseName], houseData);
      }
      return data;
    }, { houses: {}, regions: {} });
  res.locals.regions = regions;
  res.locals.houses = houses;
  return next();
};

gotController.populateCharacterAllegiances = (req, res, next) => {
  const { characters, houses, regions } = res.locals;
  Object.keys(characters).forEach(char => {
    characters[char].allegiances = Object.keys(characters[char].allegiances)
      .reduce((allied, houseId) => {
        const house = Object.keys(houses).find(houseName => {
          return houses[houseName].houseId === parseInt(houseId)
        });
        if (house) {
          allied[house] = true;
          if (characters[char].familyName === house) houses[house].familyMembers[char] = true;
          else if (houses[house].swornMembers[characters[char].charId]) {
            delete houses[house].swornMembers[characters[char].charId];
            houses[house].swornMembers[char] = true;
          }
        }
        else allied[houseId] = true;
        return allied;
      }, {});
  });
  return next();
};

gotController.sortByRegion = (req, res, next) => {
  res.locals.regions = res.locals.houses.allIds.reduce((regions, houseId) => {
    const house = res.locals.houses.byId[houseId];
    const splitName = house.name.split(' ');
    const region = house.region === '' ? null : house.region;
    const houseName = `${splitName[0]} ${splitName[1]}`;
    res.locals.houses.byId[houseId].houseName = houseName;
    if (region && houseName) {
      if (!regions[region]) regions[region] = { houses: {} };
      if (!regions[region].houses[houseName]) regions[region].houses[houseName] = { familyName: splitName[1], houseIds: {}, swornMembers: {}, familyMembers: {}, allies: {} };
      regions[region].houses[houseName].houseIds[houseId] = true;
      if (house.swornMembers.length) {
        regions[region].houses[houseName].swornMembers = house.swornMembers
          .filter(mem => mem !== '')
          .reduce((mems, curMem) => {
            const splitUrl = curMem.split('/');
            const charId = parseInt(splitUrl[splitUrl.length - 1]);
            mems[charId] = true;
            return mems;
          }, { ...regions[region].houses[houseName].swornMembers });
      }
    }
    return regions;
  }, {});
  res.locals.characters.allIds.forEach(charId => {
    const char = res.locals.characters.byId[charId];
    if (char.allegiances.length) {
      char.allegiances
        .filter(house => house !== '')
        .forEach(houseUrl => {
          const splitUrl = houseUrl.split('/');
          const houseId = parseInt(splitUrl[splitUrl.length - 1]);
          const house = res.locals.houses.byId[houseId];
          const [firstName, lastName] = char.name.split(' ');
          if (lastName
            && house
            && res.locals.regions[house.region]
            && res.locals.regions[house.region].houses[house.houseName]
            && res.locals.regions[house.region].houses[house.houseName].familyName === lastName) {
            res.locals.regions[house.region].houses[house.houseName].familyMembers[charId] = true;
          }
          else if (house
            && res.locals.regions[house.region]
            && res.locals.regions[house.region].houses[house.houseName]
            && !res.locals.regions[house.region].houses[house.houseName].swornMembers[charId]) {
            res.locals.regions[house.region].houses[house.houseName].allies[charId] = true;
          }
        });
    }
  });
  return next();
};

module.exports = gotController;
