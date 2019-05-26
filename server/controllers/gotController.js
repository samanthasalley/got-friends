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

gotController.fetchCharacters = async (req, res, next) => {
  const charsUrl = `${baseRequest.url}/characters`;
  const allCharacters = await fetchAll(charsUrl, baseRequest.pageSize);
  const filteredCharacters = allCharacters.filter(char => char.name !== '');
  const formattedCharacters = formatIdByURL(filteredCharacters, 'charId');
  res.locals.characters = formattedCharacters;
  return next();
};

gotController.fetchHouses = async (req, res, next) => {
  const housesUrl = `${baseRequest.url}/houses`;
  const allHouses = await fetchAll(housesUrl, baseRequest.pageSize);
  const formattedHouses = formatIdByURL(allHouses, 'houseId');
  res.locals.houses = formattedHouses;
  return next();
};

gotController.splitCharactersBySeason = (req, res, next) => {
  if (!res.locals.characters || !res.locals.characters.allIds.length) return next();
  const seasonData = res.locals.characters.allIds
    .filter(charId => res.locals.characters.byId[charId].tvSeries.length)
    .reduce((data, charId) => {
      const char = res.locals.characters.byId[charId];
      char.tvSeries.forEach(season => {
        if (season !== '') {
          const splitSeason = season.split(' ');
          const seasonNumber = parseInt(splitSeason[splitSeason.length - 1]);
          if (!data[seasonNumber]) data[seasonNumber] = [];
          data[seasonNumber].push(charId);
        }
      });
      return data;
    }, {});
  res.locals.seasons = seasonData;
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
