import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:order_has_product');

// Create a order_has_product data mapper
/**
 * A data mapper for the order_has_product table.
 * @class
 * @augments CoreDataMapper
 */
class OrderHasProductrDataMapper extends CoreDataMapper {
  static tableName = 'order_has_product';

  // insertfunction created in postgresql
  static insertFunc = 'create_order_has_product';

  /**
   * Creates a new instance of the OrderHasProductrDataMapper class.
   * @constructor
   */
  constructor() {
    super();
    debug('order_has_product data mapper created');
  }
}

export default new OrderHasProductrDataMapper();
