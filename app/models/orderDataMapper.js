import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:order');

// Create a order data mapper
class OrderDataMapper extends CoreDataMapper {
  static tableName = 'order';

  // insertfunction created in postgresql
  static insertFunc = 'create_order';

  /**
   * create a order data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('order data mapper created');
  }
}

export default new OrderDataMapper();
