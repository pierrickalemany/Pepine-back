import Debug from 'debug';
import client from './helpers/database.js';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:order');

// Create a order data mapper
/**
 * A class representing a data mapper for orders.
 * @extends CoreDataMapper
 */
class OrderDataMapper extends CoreDataMapper {
  static tableName = 'order';

  // insertfunction created in postgresql
  static insertFunc = 'create_order';

  static updateFunc = 'update_order_status';

  static viewname = 'getAllOrders';

  /**
   * Fetch all orders from the database.
   * @async
   * @returns {Promise<Array>} An array of orders.
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
   * Fetch an order by its ID.
   * @async
   * @param {number} orderId - The ID of the order to fetch.
   * @returns {Promise<Object>} The order object.
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
   * Create an instance of the OrderDataMapper class.
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('order data mapper created');
  }

  /**
   * Update the status of an order in the database.
   * @async
   * @param {number} orderId - The ID of the order to update.
   * @param {string} newStatus - The new status of the order.
   * @returns {Promise<Object>} The updated order object.
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
