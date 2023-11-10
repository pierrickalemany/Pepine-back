import Debug from 'debug';
import client from './helpers/database.js';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:category');

// Create a category data mapper
/**
 * A class representing a data mapper for categories.
 * @extends CoreDataMapper
 */
class CategoryDataMapper extends CoreDataMapper {
  static tableName = 'category';

  // static insertFunc = 'create_category';

  // static updateFunc = 'update_category';

  /**
   * Fetch all entries from according to category id.
   *
   * @param {number} id - The id of the category.
   * @returns {array} An array of entries.
   */
  async findAllProductsOfCategory(id) {
    debug(`${this.constructor.name} findAllProductsOfCategory(${id})`);
    const preparedQuery = {
      text:
        `
        SELECT * FROM getAllProducts gap
        LEFT JOIN product_has_category pc ON gap.id = pc.product_id
        LEFT JOIN category c ON pc.category_id = c.id
        WHERE c.id=$1
        ORDER BY gap.id
        `,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * Create a category data mapper.
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('category data mapper created');
  }
}

export default new CategoryDataMapper();
