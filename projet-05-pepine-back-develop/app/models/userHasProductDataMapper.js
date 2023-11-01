import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:user_has_product');

// Create a user_has_product data mapper
class UserHasProductDataMapper extends CoreDataMapper {
  static tableName = 'user_has_product';

  static insertFunc = 'create_user_has_product';

  /**
   * create a user_has_product data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('user_has_product data mapper created');
  }
}

export default new UserHasProductDataMapper();
