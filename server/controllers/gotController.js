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

const fetchAll = async (url, pageSize, lastPage, curPage = 2, results = []) => {
  if (curPage > lastPage) return results;
  const newFetchURL = `${url}?page=${curPage}&pageSize=${pageSize}`;
  const newData = dataCache[newFetchURL] ? dataCache[newFetchURL] : await fetch(newFetchURL).then(data => data.json());
  if (!dataCache[newFetchURL]) dataCache[newFetchURL] = newData;
  return fetchAll(url, pageSize, lastPage, curPage + 1, [...results, ...newData]);
};

gotController.fetchCharacters = async (req, res, next) => {
  const charsUrl = `${baseRequest.url}/characters`;
  const firstPageUrl = `${charsUrl}?page=1&pageSize=${baseRequest.pageSize}`;
  let lastPage;
  const initialResults = await fetch(firstPageUrl)
    .then((chars) => {
      const parsedLinkHeader = parseHeader(chars.headers.get('link'));
      lastPage = parseInt(parsedLinkHeader.last.page);
      return chars.json();
    });

  if (lastPage !== 1) {
    if (lastPage > 10) lastPage = 10;
    const allCharacterFetches = await fetchAll(charsUrl, baseRequest.pageSize, lastPage);
    res.locals.characters = [...initialResults, ...allCharacterFetches];
  }
  else res.locals.characters = initialResults;
  return next();
};

module.exports = gotController;
