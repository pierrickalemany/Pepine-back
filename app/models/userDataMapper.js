import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:user');

// Create a user data mapper
class UserDataMapper extends CoreDataMapper {
  static tableName = 'user';

  // insertfunction created in postgresql
  static insertFunc = 'create_user';

  // update function created in postgresql
  static updateFunc = 'update_user';

  /**
   * create a user data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('user data mapper created');
  }
}

export default new UserDataMapper();
