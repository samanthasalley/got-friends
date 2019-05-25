/**
 * ************************************
 *
 * @module  queryStringUtil
 * @author  boilerplate
 * @date    boilerplate
 * @description reusable query string functions wrapping the query-string library
 *
 * ************************************
 */

import queryString from 'query-string';

export const parseQueryString = () => {
  const parsedQS = {
    ...queryString.parse(location.search),
    ...queryString.parse(location.hash)
  };
  return parsedQS;
};

export const findOneInQueryString = (searchTerm) => {
  const qs = parseQueryString();
  if (qs[searchTerm]) return qs[searchTerm];
  return false;
};

export const findAllInQueryString = (searchTerms = []) => {
  const qs = parseQueryString();
  return searchTerms.reduce((found, cur) => {
    if (qs[cur]) found[cur] = qs[cur];
    return found;
  }, {});
}