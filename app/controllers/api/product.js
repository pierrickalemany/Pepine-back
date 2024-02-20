import Debug from 'debug';
import CoreController from './CoreController.js';
import productDataMapper from '../../models/productDataMapper.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';

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

  /**
   * Responds with a product to update.
   * @async
   * @param {Object} request - The HTTP request object
   * @param {Object} response - The HTTP response object
   */
  getProductToUpdate = async (request, response) => {
    debug(`${this.constructor.name} getProductToUpdate`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findProductToUpdate(id);
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);

    // Check if the result is not null
    if (!results) {
      throw new NoRessourceFoundError();
    }
  };
}

export default new ProductController();
