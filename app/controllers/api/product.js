import Debug from 'debug';
import CoreController from './CoreController.js';
import productDataMapper from '../../models/productDataMapper.js';

const debug = Debug('pepine:controllers:product');

/** Class representing a product controller. */
/**
 * Controller for managing products.
 *
 * @class
 * @extends CoreController
 */
class ProductController extends CoreController {
  static dataMapper = productDataMapper;

  // table name in postgresql
  static dataNames = 'product';

  /**
   * Creates a new instance of the ProductController class.
   *
   * @constructor
   * @augments CoreController
   */
  constructor() {
    super();

    debug('Product controller created');
  }
}

export default new ProductController();
