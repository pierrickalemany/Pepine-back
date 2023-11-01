import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:product_has_category');

// Create a product_has_category data mapper
class ProductHasCategoryrDataMapper extends CoreDataMapper {
  static tableName = 'product_has_category';

  static insertFunc = 'create_product_has_category';

  /**
   * create a product_has_category data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('product_has_category data mapper created');
  }
}

export default new ProductHasCategoryrDataMapper();
