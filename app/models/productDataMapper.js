import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:product');

// Create a product data mapper
class ProductDataMapper extends CoreDataMapper {
  static tableName = 'product';

  static insertFunc = 'create_product';

  static viewname = 'getAllProducts';

  static updateFunc = 'update_product';

  /**
   * create a product data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('product data mapper created');
  }
}

export default new ProductDataMapper();
