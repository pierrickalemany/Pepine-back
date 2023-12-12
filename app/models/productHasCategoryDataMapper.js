/* eslint-disable max-len */
import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';
import client from './helpers/database.js';

const debug = Debug('pepine:DataMapper:product_has_category');

// Create a product_has_category data mapper
/**
 * A class representing a data mapper for the product_has_category table in the database.
 * @extends CoreDataMapper
 */
class ProductHasCategoryDataMapper extends CoreDataMapper {
  static tableName = 'product_has_category';

  // insertfunction created in postgresql
  static insertFunc = 'create_product_has_category';

  static updateFunc = 'update_product_categories';

  /**
   * Creates a new instance of the ProductHasCategoryDataMapper class.
   * @constructor
   */
  constructor() {
    super();
    debug('product_has_category data mapper created');
  }

  /**
   * Updates the categories of a product in the database.
   * @async
   * @param {number} productId - The ID of the product to update.
   * @param {number[]} categoryIds - An array of category IDs to assign to the product.
   * @returns {Promise<Object>} - A Promise that resolves to an object representing the updated product.
   */
  updateProductCategories = async (productId, categoryIds) => {
    debug(`${this.constructor.name} updateProductCategories $, ${productId}, ${categoryIds}`);
    const query = {
      text: `SELECT ${this.constructor.updateFunc}($1, $2)`,
      values: [productId, categoryIds],
    };
    const result = await client.query(query);
    return result.rows[0];
  };
}

export default new ProductHasCategoryDataMapper();
