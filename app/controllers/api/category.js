import Debug from 'debug';
import CoreController from './CoreController.js';
import categoryDataMapper from '../../models/categoryDataMapper.js';

const debug = Debug('pepine:controllers:category');

/** Class representing a category controller. */
class CategoryController extends CoreController {
  static dataMapper = categoryDataMapper;

  static dataNames = 'category';

  /**
   * create a category controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    debug('category controller created');
  }

  /**
   * responds with all entries from one entry from a table
   *
   * @param {Object} _
   * @param {Object} response
   */
  getAllProductsOfCategory = async (request, response) => {
    debug(`${this.constructor.name} getAllProductsOfCategory`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findAllProductsOfCategory(id);
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);
  };
}

export default new CategoryController();
