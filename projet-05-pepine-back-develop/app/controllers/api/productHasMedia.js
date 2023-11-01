import Debug from 'debug';
import CoreController from './CoreController.js';
import productHasMediaDataMapper from '../../models/productHasMediaDataMapper.js';

const debug = Debug('pepine:controllers:productHasMedia');

/** Class representing a productHasMedia controller. */
class ProductHasMediaController extends CoreController {
  static dataMapper = productHasMediaDataMapper;

  static dataNames = 'product_has_media';

  /**
   * create a productHasMedia controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('productHasMedia controller created');
  }
}

export default new ProductHasMediaController();
