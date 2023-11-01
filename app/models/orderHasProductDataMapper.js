import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:order_has_product');

// Create a order_has_product data mapper
class OrderHasProductrDataMapper extends CoreDataMapper {
  static tableName = 'order_has_product';

  static insertFunc = 'create_order_has_product';

  /**
   * create a order_has_product data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('order_has_product data mapper created');
  }
}

export default new OrderHasProductrDataMapper();
