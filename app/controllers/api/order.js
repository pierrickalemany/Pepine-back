import Debug from 'debug';
import CoreController from './CoreController.js';
import orderDataMapper from '../../models/orderDataMapper.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';
import UnauthorizedError from '../../errors/Unauthorized.js';

const debug = Debug('pepine:controllers:order');

/** Class representing a order controller. */
/**
 * Controller for handling orders.
 * @class
 * @augments CoreController
 */
class OrderController extends CoreController {
  static dataMapper = orderDataMapper;

  // table name in postgresql
  static dataNames = 'order';

  /**
   * Creates an instance of OrderController.
   */
  constructor() {
    super();

    debug('order controller created');
  }

  /**
   * Update the status of an order by ID.
   * @async
   * @function updateOrderStatus
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {string} req.params.id - The ID of the order to update.
   * @param {string} req.body.new_status - The new status of the order.
   * @returns {Object} The updated order object.
   */
  updateOrderStatus = async (req, res) => {
    const { id } = req.params;

    // if (req.user.role !== 'admin' && String(req.user.id) !== String(id)) {
    //  throw new UnauthorizedError();
    // }
    const newStatus = req.body;
    const results = await this.constructor.dataMapper.updateOrderStatus(id, newStatus.status);
    res.json(results);
  };

  /**
   * Responds with all entries from a table.
   * @async
   * @function getAllOrders
   * @param {Object} _ - The request object (unused).
   * @param {Object} response - The response object.
   * @returns {Object} The response object with the orders data.
   */
  getAllOrders = async (_, response) => {
    debug(`${this.constructor.name} getAllOrders`);
    const results = await this.constructor.dataMapper.findAllOrders();
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);
  };

  /**
   * Responds with one entry from a table.
   * @async
   * @function getOneOrder
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @returns {Object} The response object with the order data.
   */
  getOneOrder = async (request, response) => {
    debug(`${this.constructor.name} getOneOrder`);
    const { id } = request.params;
    const result = await this.constructor.dataMapper.findOrderByPk(id);
    // Check if the user asking for the orders is the same as the user in the request
    if (request.user.role !== 'admin' && String(request.user.id) !== String(result.user_id)) {
      throw new UnauthorizedError();
    }
    // Check if the result is not null
    if (!result) {
      throw new NoRessourceFoundError();
    }

    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = result;
    return response.json(responseObject);
  };
}

export default new OrderController();
