import Debug from 'debug';
import CoreController from './CoreController.js';
import productHasMediaDataMapper from '../../models/productHasMediaDataMapper.js';
import UnauthorizedError from '../../errors/Unauthorized.js';
import NoResourceFoundError from '../../errors/NoRessourceFoundError.js';
import InternalServerError from '../../errors/InternalServerError.js';

const debug = Debug('pepine:controllers:productHasMedia');

/** Class representing a productHasMedia controller. */
/**
 * Controller for managing product media.
 * @class
 * @augments CoreController
 */
class ProductHasMediaController extends CoreController {
  static dataMapper = productHasMediaDataMapper;

  static dataNames = 'product_has_media';

  /**
   * Creates a new instance of the ProductHasMediaController class.
   * @constructor
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
  updateProductMedias = async (request, response) => {
    const { id } = request.params;
    const { newMediaUrls } = request.body;

    // condition so that only the administrator can update a category of product
    if (request.user.role !== 'admin') {
      throw new UnauthorizedError();
    }

    const results = await this.constructor.dataMapper.updateProductMedias(id, newMediaUrls);
    response.json(results);

    // Check if the update was successful
    if (results) {
      response.json({
        status: 'success',
        data: results,
      });
    } else {
      throw new NoResourceFoundError();
    }
    if (!results) {
      throw new InternalServerError();
    }
  };
}

export default new ProductHasMediaController();
