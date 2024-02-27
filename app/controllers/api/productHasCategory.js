/* eslint-disable max-len */
import Debug from 'debug';
import CoreController from './CoreController.js';
import productHasCategoryDataMapper from '../../models/productHasCategoryDataMapper.js';
import UnauthorizedError from '../../errors/Unauthorized.js';
import ConflictError from '../../errors/ConflictError.js';
import BadInputError from '../../errors/BadInputError.js';

const debug = Debug('pepine:controllers:product_has_category');

/** Class representing a product_has_category controller. */
/**
 * Controller for managing the relationship between products and categories.
 * @class
 * @extends CoreController
 */
class ProductHasCategoryController extends CoreController {
  /**
   * The data mapper for this controller.
   * @type {productHasCategoryDataMapper}
   * @static
   */
  static dataMapper = productHasCategoryDataMapper;

  /**
   * The name of the table in the database.
   * @type {string}
   * @static
   */
  static dataNames = 'product_has_category';

  /**
   * Creates a new instance of the ProductHasCategoryController class.
   * @constructor
   */
  constructor() {
    super();

    debug('product_has_category controller created');
  }

  /**
   * Updates the categories of a product.
   * @async
   * @function updateProductCategories
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {string} req.params.id - The ID of the product to update.
   * @param {Array.<string>} req.body.categoryIds - The IDs of the categories to assign to the product.
   * @returns {Promise<void>} - A promise that resolves with the updated product categories.
   */
  updateProductCategories = async (request, response) => {
    const { id } = request.params;
    const { categoryIds } = request.body;

    // condition so that only the administrator can update a category of product
    if (request.user.role !== 'admin') {
      throw new UnauthorizedError();
    }

    const results = await this.constructor.dataMapper.updateProductCategories(id, categoryIds);
    response.json(results);
  };

  /**
   * @function
   * @param {*} request the request object
   * @param {*} response the response object
   * @returns {Promise<void>} - A promise that resolves with the updated product categories.
   */
  deleteCategoryByProductId = async (request, response) => {
    const { id } = request.params;

    const deleteCount = await this.constructor.dataMapper.deleteProductCategories(id);
    // Check if the entry delete is not on conflict
    if (deleteCount === null) {
      throw new ConflictError();
    }

    // Check if the instructions are correct
    if (!deleteCount) {
      throw new BadInputError();
    }
    response.json({ status: 'success', data: null });
  };
}

export default new ProductHasCategoryController();
