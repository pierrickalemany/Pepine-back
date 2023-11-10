import Debug from 'debug';
import CoreController from './CoreController.js';
import orderHasProductDataMapper from '../../models/orderHasProductDataMapper.js';

const debug = Debug('pepine:controllers:order_has_product');

/** Class representing a order_has_product controller. */
/**
 * Controller for managing the relationship between orders and products.
 * @class
 * @augments CoreController
 */
class OrderHasProductController extends CoreController {
  static dataMapper = orderHasProductDataMapper;

  // table name in postgresql
  static dataNames = 'order_has_product';

  /**
   * Creates a new instance of the OrderHasProductController class.
   * @constructor
   */
  constructor() {
    super();

    debug('order_has_product controller created');
  }
}

export default new OrderHasProductController();
