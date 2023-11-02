import Debug from 'debug';
import CoreController from './CoreController.js';
import userDataMapper from '../../models/userDataMapper.js';

const debug = Debug('pepine:controllers:user');

/** Class representing a user controller. */
class UserController extends CoreController {
  static dataMapper = userDataMapper;

  // table name in postgresql
  static dataNames = 'user';

  /**
   * create a user controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('user controller created');
  }
}

export default new UserController();
