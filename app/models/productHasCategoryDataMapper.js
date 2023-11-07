import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';
import client from './helpers/database.js';

const debug = Debug('pepine:DataMapper:product_has_category');

// Create a product_has_category data mapper
class ProductHasCategoryDataMapper extends CoreDataMapper {
  static tableName = 'product_has_category';

  // insertfunction created in postgresql
  static insertFunc = 'create_product_has_category';

  static updateFunc = 'update_product_categories';

  /**
   * create a product_has_category data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('product_has_category data mapper created');
  }

  /**
   * Updates the categories of a product in the database.
   * @async
   * @param {number} product_id - The ID of the product to update.
   * @param {number[]} category_ids - An array of category IDs to assign to the product.
  * @returns {Promise<Object>} - A Promise that resolves to an object
  * representing the updated product.
   */
  updateProductCategories = async (productId, categoryIds) => {
    debug(`${this.constructor.name} updateProductCategories`);
    const query = {
      text: `SELECT ${this.constructor.updateFunc}($1, $2)`,
      values: [productId, categoryIds],
    };
    const result = await client.query(query);
    return result.rows[0];
  };
}

export default new ProductHasCategoryDataMapper();
