import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

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

  // update function created in postgresql
  static updateFunc = 'update_product';

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
