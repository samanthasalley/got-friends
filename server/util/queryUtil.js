/**
 * ************************************
 *
 * @module  queryUtil
 * @author  boilerplate
 * @date    boilerplate
 * @description util enabling dynamic query building
 *
 * ************************************
 */

const moment = require('moment');
const pgdb = require('../models/pgdbmodel');

const queryUtil = {};

/**
 * @name handleValueType
 * @param {any} value
 * @param {string} type notes the sql data type for value param
 * @description updates value if sql is expecting data in specific
 *              format (i.e. wraps strings in single quotes)
 */
const handleValueType = (value, type = null) => {
  const dataType = type || typeof value;
  switch (dataType) {
    case 'string':
      return `'${value}'`
      break;
    case 'object':
      if (value === null) return 'NULL';
      else return `'${JSON.stringify(value)}'`;
      break;
    case 'number':
    default:
      return value;
  }
};

/**
 * queryUtil.buildWhereIn -
  * helper function to build sql IN string for n number of values
 * @param {string} columnName - column in which values should be located
 * @param {array} valuesArr - array of possible values for the columnName
 * @param {string} valueType - data type sql is expecting, enables formatting via helper func
 * @returns {string} - ex. '${columnName} IN (${valuesArr[0]}, ${valuesArr[1]}, ..., ${valuesArr[n]})';
 */
queryUtil.buildWhereIn = (columnName, valuesArr, valueType) => {
  let query = `${columnName} IN (`;
  for (let i = 0; i < valuesArr.length; i++) {
    if (i > 0) query += ', ';
    query += `${handleValueType(valuesArr[i], valueType)}`;
  }
  query += ')'
  return query;
}

/**
 * queryUtil.buildOrQuery -
  * helper function to build sql OR string for n number of values
 * @param {string} field - field for the OR condition
 * @param {array} values - array of possible values for the field
 * @returns {string} - ex. 'OR ${field} = ${values[0]}, OR ${field} = ${values[1]}, ..., ${field} = ${values[n]}';
 */
queryUtil.buildOrQuery = (field, values) => {
  let str = ``;
  values.forEach((val, i) => {
    if (i !== 0) str += ` OR`;
    str += ` ${field} = \'${val}\'`;
  });
  return str;
};

/**
 * @name queryUtil.buildSetText
 * @description creates postgres SET query string by iterating through
 *  updatedKeys array and setting the key to its value in data
 * @param {array} updatedKeys
 * @param {obj} data 
 */
queryUtil.buildSetText = (updatedKeys, data) => {
  const valIsString = (val) => typeof val === 'string';

  return updatedKeys.reduce((setText, curKey, i) => {
    if (i === 0) setText += 'SET '; // add start of SET if first item
    else setText += ', '; // otherwise add comma to separate
    const addQuoteIfStr = valIsString ? "'" : '';
    setText += `${curKey} = ${addQuoteIfStr}${data[curKey]}${addQuoteIfStr}`;
    if (i === updatedKeys.length - 1) setText += ' '; // if last value to update, add end space
    return setText;
  }, ``);
};

/**
 * @name queryUtil.buildMultiValues
 * @description creates values string for a multiple value insert/upsert query
 *  based on dynamic passed in value sets data.
 * @param {array} data - an array of value sets each 
 *  representing a single record in a table
 */
queryUtil.buildMultiValues = (data) => {
  // reduce each value set into string by iterating
  //  over each value set and reducing each value in
  //  the set down to a single value string and concatting
  //  all together.
  return data.reduce((finalString, valueSet, i) => {
    if (i === 0) finalString += 'VALUES ';
    else finalString += ', ';
    finalString += valueSet.reduce((singleString, curVal, x) => {
      if (x === 0) singleString += '(';
      else singleString += ', ';
      singleString += handleValueType(curVal);
      if (x === valueSet.length - 1) singleString += ')';
      return singleString;
    }, "");
    return finalString;
  }, "");
};

/**
 * queryUtil.buildInsertQuery - helper function builds INSERT query
 *  with dynamic columns, table, values, and returning str.
 * @param {str} table - name of table to insert into
 * @param {obj} data - keys represent table column names,
 *  values represent the values for the row to be inserted
 * @param {str} end - any additional query string (i.e. RETURNING)
 *  otherwise, defaults to ';'
 * @returns {str} - utilizing $1, $2, ..., $n for VALUES, expects
 *                  user will submit query in the following format 
 *                  { text: '', values: [] }
 */
queryUtil.buildInsertQuery = (table, data, end = ';') => {
  let query = '';
  let keys = Object.keys(data).join(', ');
  let vals = Object.values(data).map((val, i) => `$${i + 1}`).join(', ');

  query += `
    INSERT INTO ${table} (
      ${keys}
    )
    VALUES (
      ${vals}
    )
    ${end}
  `;

  return query;
};

/**
 * queryUtil.buildInsertQuery - helper function builds INSERT query
 *  with dynamic columns, table, values, and returning str.
 * @param {str} table - name of table to insert into
 * @param {obj} data - keys represent table column names,
 *  values represent the values for the row to be inserted
 * @param {str} end - any additional query string (i.e. RETURNING)
 *  otherwise, defaults to ';'
 * @returns {str} - utilizing $1, $2, ..., $n for VALUES, expects
 *                  user will submit query in the following format 
 *                  { text: '', values: [] }
 */
queryUtil.buildInsertQuery = (table, data, end = ';') => {
  let query = '';
  let keys = Object.keys(data).join(', ');
  let vals = Object.values(data).map((val, i) => `$${i + 1}`).join(', ');

  query += `
    INSERT INTO ${table} (
      ${keys}
    )
    VALUES (
      ${vals}
    )
    ${end}
  `;

  return query;
};



/**
 * TODO: update the above queries to work in this structure!
 */

const startQuery = (queryType, tableName) => {
  let text;
  switch (queryType) {
    case 'insert':
    case 'insert-multi':
      text = `INSERT INTO ${tableName}`;
      break;
    case 'update':
      text = `UPDATE ${tableName}`;
      break;
    case 'select':
      text = `SELECT`;
      break;
    case 'delete':
      text = `DELETE FROM ${tableName}`;
      break;
    default:
      throw new Error('Invalid queryType passed to queryUtil startQuery');
  }
  return text;
};

const buildValuesData = (values) => {
  // reduce values set into string by iterating
  //  over each value set and reducing each value in
  //  the set down to a single value string and concatting
  //  all together.
  return values.reduce((acc, curValue, i) => {
    if (i === 0) acc.valuesText += 'VALUES (';
    else acc.valuesText += ', ';
    acc.valuesText += `$${i + 1}`;
    acc.values.push(curValue);
    if (i === values.length - 1) acc.valuesText += ')';
    return acc;
  }, { valuesText: "", values: [] });
};

const buildMultiValuesData = (data) => {
  // reduce each value set into string by iterating
  //  over each value set and reducing each value in
  //  the set down to a single value string and concatting
  //  all together.
  return data.reduce((finalString, valueSet, i) => {
    if (i === 0) finalString += 'VALUES ';
    else finalString += ', ';
    finalString += valueSet.reduce((singleString, curVal, x) => {
      if (x === 0) singleString += '(';
      else singleString += ', ';
      singleString += handleValueType(curVal);
      if (x === valueSet.length - 1) singleString += ')';
      return singleString;
    }, "");
    return finalString;
  }, "");
};

const buildSetData = (data) => {
  return Object.keys(data).reduce((acc, curKey, i) => {
    if (i === 0) acc.setText += 'SET '; // add start of SET if first item
    else acc.setText += ', '; // otherwise add comma to separate
    acc.setText += `${curKey} = $${i + 1}`;
    acc.values.push(data[curKey]);
    return acc;
  }, { setText: ``, values: [] });
};

queryUtil.buildDynamicQuery = (queryType, table, data, end) => {
  const queryStart = startQuery(queryType, table);
  let query = queryStart;
  switch (queryType) {
    case 'insert':
      const columnsToUpdate = Object.keys(data).join(', ');
      const insertData = buildValuesData(Object.values(data));
      query += ` (
          ${columnsToUpdate}
        ) 
        ${insertData.valuesText} 
        ${end}
      `;
      return {
        text: query,
        values: insertData.values
      };
      break;
    case 'insert-multi':
      const columnsForMultiInsert = data.columns.join(', ');
      const valsForMultiInsert = buildMultiValuesData(data.values);
      // let query = buildDynamicValuesInsert(table, data);
      query += `(
          ${columnsForMultiInsert}
        ) 
        ${valsForMultiInsert} 
        ${end}
      `;
      return query;
      break;
    case 'update':
      const updateData = buildSetData(data);
      query += ` ${updateData.setText} ${end}`;
      return {
        text: query,
        values: updateData.values
      };
      break;
    case 'select':
      // TODO: add buildWhereData
      const columnsToSelect = typeof data === 'string' ? data : Object.keys(data).join(', ');
      query += ` ${columnsToSelect} FROM ${table} ${end}`;
      return query;
      break;
    case 'delete':
      query += ` ${end}`;
      return query;
      break;
    default:
      throw new Error('queryType not handled in queryUtil buildDynamicQuery');
      return;
  }
};

/**
 * @name queryUtil.asyncDbQuery
 * @param {string || object} query valid pg promise query
 * @returns promise obj for db query
 * @description wraps db promise / error handling for use with async/await
 */
queryUtil.asyncDbQuery = (query) => {
  return pgdb.query(query)
    .then(queryRes => {
      return ({
        ok: true,
        data: {
          rowCount: queryRes.rowCount,
          rows: queryRes.rows,
        }
      })
    })
    .catch(err => {
      console.log(`${moment()}: queryUtil.asyncDbQuery: db error for query: `);
      console.log(query);
      console.log(`DB ERROR MESSAGE: `, err);
      return Promise.resolve({ 
        ok: false,
        err: err || 'Unknown error occurred',
      });
    });
};

module.exports = queryUtil;