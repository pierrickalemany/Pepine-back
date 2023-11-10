import Debug from 'debug';
import CoreController from './CoreController.js';
import categoryDataMapper from '../../models/categoryDataMapper.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';

const debug = Debug('pepine:controllers:category');

/** Class representing a category controller. */
/**
 * Controller for handling category-related requests
 * @class
 * @augments CoreController
 */
class CategoryController extends CoreController {
  static dataMapper = categoryDataMapper;

  static dataNames = 'category';

  /**
   * Creates a new instance of CategoryController
   * @constructor
   */
  constructor() {
    super();
    debug('category controller created');
  }

  /**
   * Responds with all products of a given category
   * @async
   * @param {Object} request - The HTTP request object
   * @param {Object} response - The HTTP response object
   */
  getAllProductsOfCategory = async (request, response) => {
    debug(`${this.constructor.name} getAllProductsOfCategory`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findAllProductsOfCategory(id);
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);

    // Check if the result is not null
    if (!results) {
      throw new NoRessourceFoundError();
    }
  };
}

export default new CategoryController();
