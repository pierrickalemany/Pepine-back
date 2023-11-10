import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';
import client from './helpers/database.js';

const debug = Debug('pepine:DataMapper:product_has_media');

// Create a product_has_media data mapper
/**
 * A class representing a data mapper for the product_has_media table in the database.
 * @extends CoreDataMapper
 */
class ProductHasMediaDataMapper extends CoreDataMapper {
  static tableName = 'product_has_media';

  // insertfunction created in postgresql
  static insertFunc = 'create_product_has_media';

  static updateFunc = 'update_product_media';

  /**
   * Creates a new instance of the ProductHasMediaDataMapper class.
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('product_has_media data mapper created');
  }

  /**
   * Updates the media URLs of a product in the database.
   * @async
   * @param {number} productId - The ID of the product to update.
   * @param {string[]} newMediaUrls - An array of new media URLs to set for the product.
   * @returns {Promise<Object>} - A Promise that resolves to the updated product data.
   */
  updateProductMedias = async (productId, newMediaUrls) => {
    debug(`${this.constructor.name} updateProductMedias`);
    const jsonString = JSON.stringify(newMediaUrls);
    const query = {
      text: `SELECT ${this.constructor.updateFunc}($1, $2)`,
      values: [productId, jsonString],
    };
    const result = await client.query(query);
    return result.rows[0];
  };
}

export default new ProductHasMediaDataMapper();
