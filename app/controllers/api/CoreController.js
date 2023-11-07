import Debug from 'debug';
import UnprocessableEntityError from '../../errors/UnprocessableEntityError.js';

const debug = Debug('pepine:CoreController');

class CoreController {
  /**
   * responds with all entries from a table
   *
   * @param {Object} _
   * @param {Object} response
   */
  getAll = async (_, response) => {
    debug(`${this.constructor.name} getAll`);
    const results = await this.constructor.dataMapper.findAll();
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
  getOne = async (request, response) => {
    debug(`${this.constructor.name} getOne`);
    const { id } = request.params;
    const result = await this.constructor.dataMapper.findByPk(id);
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = result;
    return response.json(responseObject);
  };

  /**
   * create one entry in a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  create = async (request, response) => {
    debug(`${this.constructor.name} create`);
    const result = await this.constructor.dataMapper.create(request.body);
    const responseObject = { statut: 'success', data: {} };
    responseObject.data[this.constructor.dataNames[0]] = result;
    response.json(responseObject);
  };

  /**
   * update one entry in a table
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberof CoreController
  */
  update = async (request, response) => {
    debug(`${this.constructor.name} update`);
    request.body.id = request.params.id;
    const result = await this.constructor.dataMapper.update(request.body);
    const responseObject = { statut: 'success', data: {} };
    responseObject.data[this.constructor.dataNames[0]] = result;
    response.json(responseObject);
  };

  /**
   * remove one entry in a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  deleteOne = async (request, response) => {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;
    const deleteCount = await this.constructor.dataMapper.delete(id);
    if (!deleteCount) {
      throw new UnprocessableEntityError();
    }
    response.json({ status: 'success', data: null });
  };
}

export default CoreController;
