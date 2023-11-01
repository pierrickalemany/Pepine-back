import Debug from 'debug';
import CoreController from './CoreController.js';
import orderDataMapper from '../../models/orderDataMapper.js';

const debug = Debug('pepine:controllers:order');

/** Class representing a order controller. */
class OrderController extends CoreController {
  static dataMapper = orderDataMapper;

  static dataNames = 'order';

  /**
   * create a order controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('order controller created');
  }
}

export default new OrderController();
