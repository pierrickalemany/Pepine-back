import Debug from 'debug';
import CoreController from './CoreController.js';
import productHasCategoryDataMapper from '../../models/productHasCategoryDataMapper.js';

const debug = Debug('pepine:controllers:product_has_category');

/** Class representing a product_has_category controller. */
class ProductHasCategoryController extends CoreController {
  static dataMapper = productHasCategoryDataMapper;

  // table name in postgresql
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

  /**
   * Update the categories of a product.
   * @async
   * @function updateProductCategories
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {string} req.params.id - The ID of the product to update.
  * @param {Array.<string>} req.body.category_ids - The IDs of the
  * categories to assign to the product.
   * @returns {Promise<void>} - A promise that resolves with the updated product categories.
   */
  updateProductCategories = async (req, res) => {
    const { id } = req.params;
    const { categoryIds } = req.body;
    const results = await this.constructor.dataMapper.updateProductCategories(id, categoryIds);
    res.json(results);
  };
}

export default new ProductHasCategoryController();
