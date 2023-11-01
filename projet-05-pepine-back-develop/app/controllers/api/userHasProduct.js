import Debug from 'debug';
import CoreController from './CoreController.js';
import userHasProductDataMapper from '../../models/userHasProductDataMapper.js';

const debug = Debug('pepine:controllers:user_has_product');

/** Class representing a user_has_product controller. */
class UserHasProductController extends CoreController {
  static dataMapper = userHasProductDataMapper;

  static dataNames = 'user_has_product';

  /**
   * create a user_has_product controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('user_has_product controller created');
  }
}

export default new UserHasProductController();
