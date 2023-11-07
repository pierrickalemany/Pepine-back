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

  /**
   * Updates the media URLs of a product with the given ID.
   * @async
   * @function updateProductMedias
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A Promise that resolves with the updated product media URLs.
   */
  updateProductMedias = async (req, res) => {
    const { id } = req.params;
    const { newMediaUrls } = req.body;
    const results = await this.constructor.dataMapper.updateProductMedias(id, newMediaUrls);
    res.json(results);
  };
}

export default new ProductHasMediaController();
