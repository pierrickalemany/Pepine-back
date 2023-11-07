import Debug from 'debug';
import client from './helpers/database.js';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:order');

// Create a order data mapper
class OrderDataMapper extends CoreDataMapper {
  static tableName = 'order';

  // insertfunction created in postgresql
  static insertFunc = 'create_order';

  static updateFunc = 'update_order_status';

  static viewname = 'getAllOrders';

  /**
   * fetch all entries
   *
   * @returns {array} array of entries
   */
  async findAllOrders() {
    debug(`${this.constructor.name} findAllOrders`);
    const dataSource = this.constructor.viewname;
    const preparedQuery = {
      text:
        `
        SELECT * FROM ${dataSource}
        ORDER BY id
        `,
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
  async findOrderByPk(orderId) {
    debug(`${this.constructor.name} findOrderByPk(${orderId})`);
    const dataSource = this.constructor.viewname;
    const preparedQuery = {
      text:
        `
        SELECT * FROM ${dataSource}
        WHERE id=$1
        `,
      values: [orderId],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * create a order data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('order data mapper created');
  }

  /**
   * Updates the status of an order in the database.
   * @async
   * @param {number} order_id - The ID of the order to update.
   * @param {string} new_status - The new status of the order.
   * @returns {Promise<Object>} - The updated order object.
   */
  updateOrderStatus = async (orderId, newStatus) => {
    debug(`${this.constructor.name} updateOrderStatus`);
    const query = {
      text: `SELECT ${this.constructor.updateFunc}($1, $2)`,
      values: [orderId, newStatus],
    };
    const result = await client.query(query);
    return result.rows[0];
  };
}

export default new OrderDataMapper();
