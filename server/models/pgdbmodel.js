/**
 * ************************************
 *
 * @module  pgdbmodel
 * @author  boilerplate
 * @date    boilerplate
 * @description database connection
 *
 * ************************************
 */

const pg = require('pg');
const config = require('config');
// create a config to configure both pooling behavior and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const dbConfig = config.get('database');

console.log(`Connected to ${dbConfig.database} on host:${dbConfig.host}`);

//this initializes a connection pool.  As per the config,
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 5 idle clients
const pool = new pg.Pool(dbConfig);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};
