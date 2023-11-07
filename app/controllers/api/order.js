import Debug from 'debug';
import CoreController from './CoreController.js';
import orderDataMapper from '../../models/orderDataMapper.js';

const debug = Debug('pepine:controllers:order');

/** Class representing a order controller. */
class OrderController extends CoreController {
  static dataMapper = orderDataMapper;

  // table name in postgresql
  static dataNames = 'order';

  /**
   * create a order controller
  *
  * @augments CoreController
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
    const { newStatus } = req.body;
    const results = await this.constructor.dataMapper.updateOrderStatus(id, newStatus);
    res.json(results);
  };

  /**
   * responds with all entries from a table
   *
   * @param {Object} _
   * @param {Object} response
   */
  getAllOrders = async (_, response) => {
    debug(`${this.constructor.name} getAllOrders`);
    const results = await this.constructor.dataMapper.findAllOrders();
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);
  };

  /**
      * responds with one entry from a table
      *
      * @param {Object} request
      * @param {Object} response
      */
  getOneOrder = async (request, response) => {
    debug(`${this.constructor.name} getOneOrder`);
    const { id } = request.params;
    const result = await this.constructor.dataMapper.findOrderByPk(id);
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = result;
    return response.json(responseObject);
  };
}

export default new OrderController();
