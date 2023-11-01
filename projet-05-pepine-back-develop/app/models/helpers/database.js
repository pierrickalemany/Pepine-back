// database connection
import Debug from 'debug';
import pkg from 'pg';

const debug = Debug('pepine:database');

const { Pool } = pkg;
const pool = new Pool();
// Use the connection pool to connect to the database.
pool.connect().then(() => {
  debug('database client connected');
});

// Method: query allows executing SQL queries on the database.
// It logs the query parameters using the debug function and
// delegates the query to the original database client.
export default {
  originalClient: pool,
  async query(...params) {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/rest_parameters
    debug(...params); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return this.originalClient.query(...params);
  },
};
