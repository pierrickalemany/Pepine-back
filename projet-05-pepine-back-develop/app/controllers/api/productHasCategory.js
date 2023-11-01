import Debug from 'debug';
import CoreController from './CoreController.js';
import productHasCategoryDataMapper from '../../models/productHasCategoryDataMapper.js';

const debug = Debug('pepine:controllers:product_has_category');

/** Class representing a product_has_category controller. */
class ProductHasCategoryController extends CoreController {
  static dataMapper = productHasCategoryDataMapper;

  static dataNames = 'product_has_category';

  /**
   * create a product_has_category controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('product_has_category controller created');
  }
}

export default new ProductHasCategoryController();
