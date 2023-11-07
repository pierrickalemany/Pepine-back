import Debug from 'debug';
import client from './helpers/database.js';

const debug = Debug('pepine:CoreDataMapper');

class CoreDataMapper {
  /**
   * fetch all entries
   *
   * @returns {array} array of entries
   */
  async findAll() {
    debug(`${this.constructor.name} findAll`);
    const dataSource = this.constructor.viewname || `"${this.constructor.tableName}"`;
    const preparedQuery = {
      text:
      `SELECT * FROM ${dataSource} ORDER BY "id"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * fetch an entry according to its id
   *
   * @param {number} id - id of the entry
   * @returns an entry
   */
  async findByPk(id) {
    debug(`${this.constructor.name} findByPk(${id})`);
    const dataSource = this.constructor.viewname || `"${this.constructor.tableName}"`;
    const preparedQuery = {
      text: `SELECT * FROM ${dataSource} WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * create a new entry
   *
   * @param {Object} obj - the entry to create
   * @returns {Object} the created entry
   */
  async create(createObj) {
    debug(`${this.constructor.name} create`);
    // Problem with "à" letter in description so to resolve problem To avoid this,
    // you can use query parameters (placeholders) in your SQL query and then pass the
    // values as separate parameters. This will ensure that special characters are properly
    // escaped and avoid syntax errors.In this example, $1 is a query parameter that will
    // be replaced by the value from the array [JSON.stringify(createObj)] when the query
    // is executed
    const query = `SELECT * FROM ${this.constructor.insertFunc}($1)`;
    const results = await client.query(query, [JSON.stringify(createObj)]);
    return results.rows;
  }

  /**
   * Updates a record in the database.
   * @async
   * @param {Object} updateObj - The object containing the updated data.
   * @returns {Object} The updated record.
   */
  async update(updateObj) {
    debug(`${this.constructor.name} update ${updateObj.id}`);
    const results = await client.query(
      `SELECT * FROM ${this.constructor.updateFunc}('${JSON.stringify(
        updateObj,
      )}')`,
    );
    return results.rows[0];
  }

  /**
   * remove an entry
   *
   * @param {number} id - the entry id
   */
  async delete(id) {
    debug(`${this.constructor.name} delete(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rowCount;
  }
}

export default CoreDataMapper;
