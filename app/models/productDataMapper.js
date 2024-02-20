import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';
import client from './helpers/database.js';

const debug = Debug('pepine:DataMapper:product');

// Create a product data mapper
/**
 * Represents a data mapper for the Product model.
 * @extends CoreDataMapper
 */
class ProductDataMapper extends CoreDataMapper {
  static tableName = 'product';

  // insertfunction created in postgresql
  static insertFunc = 'create_product';

  // view created in postgresql
  static viewname = 'getAllProducts';

  static viewnameupdate = 'getProductToUpdate';

  // update function created in postgresql
  static updateFunc = 'update_product';

  /**
   * Fetch an entry according to its id.
   *
   * @async
   * @param {number} id - The id of the entry.
   * @returns {Promise<Object>} An entry.
   */
  async findProductToUpdate(id) {
    debug(`${this.constructor.name} findByPk(${id})`);
    const dataSource = `${this.constructor.viewnameupdate}`;
    const preparedQuery = {
      text: `SELECT * FROM ${dataSource} WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);

    return results.rows[0];
  }

  /**
   * Creates a new instance of the ProductDataMapper class.
   * @constructor
   */
  constructor() {
    super();
    debug('product data mapper created');
  }
}

export default new ProductDataMapper();
