import Debug from 'debug';
import UnprocessableEntityError from '../../errors/UnprocessableEntityError.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';
import BadInputError from '../../errors/BadInputError.js';
import UnauthorizedError from '../../errors/Unauthorized.js';
import ConflictError from '../../errors/ConflictError.js';

const debug = Debug('pepine:CoreController');

/**
 * Controller class for handling CRUD operations on a table
 * @class
 */
class CoreController {
  /**
   * responds with all entries from a table
   *
   * @param {Object} _ - unused parameter
   * @param {Object} response - HTTP response object
   * @returns {Promise<void>} - Promise that resolves when the response is sent
   */
  getAll = async (_, response) => {
    debug(`${this.constructor.name} getAll`);
    const results = await this.constructor.dataMapper.findAll();
    // Check if the result is not null
    if (!results) {
      throw new NoRessourceFoundError();
    }
    const responseObject = {
      statut: 'success',
      data: {},
    };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);
  };

  /**
  * responds with one entry from a table
  *
  * @param {Object} request - HTTP request object
  * @param {Object} response - HTTP response object
  * @returns {Promise<void>} - Promise that resolves when the response is sent
  */
  getOne = async (request, response) => {
    debug(`${this.constructor.name} getOne`);
    const { id } = request.params;

    // Check if the ID is a valid number
    if (Number.isNaN(Number(id))) {
      throw new BadInputError();
    }
    // condition so that the user can only get their own account except if the user is an admin
    let result;
    if (this.constructor.name === 'UserController') {
      if (request.user.role === 'admin' || String(request.user.id) === String(request.params.id)) {
        result = await this.constructor.dataMapper.findByPk(id);
      } else {
        throw new UnauthorizedError();
      }
    } else {
      result = await this.constructor.dataMapper.findByPk(id);
    }

    // delete the password from the response if the table is user
    if (this.constructor.tableName === 'user') {
      delete result.password;
    }
    // Check if the result is not null
    if (!result) {
      throw new NoRessourceFoundError();
    }
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = result;
    return response.json(responseObject);
  };

  /**
   * create one entry in a table
   *
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Promise<void>} - Promise that resolves when the response is sent
   */
  create = async (request, response) => {
    debug(`${this.constructor.name} create`);
    const result = await this.constructor.dataMapper.create(request.body);

    // Check if the new entry is in conflict with another entry
    if (result === null) {
      throw new ConflictError();
    }

    // Check if the instructions are correct
    if (!result) {
      throw new UnprocessableEntityError();
    }

    const responseObject = { statut: 'success', data: {} };
    responseObject.data[this.constructor.dataNames[0]] = result;
    response.json(responseObject);
  };

  /**
   * update one entry in a table
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Promise<void>} - Promise that resolves when the response is sent
   * @memberof CoreController
  */
  update = async (request, response) => {
    debug(`${this.constructor.name} update`);
    request.body.id = request.params.id;

    // condition so that the user can only patch their own account
    if (this.constructor.name === 'UserController' && String(request.user.id) !== String(request.params.id)) {
      throw new UnauthorizedError();
    }

    // condition so that only the administrator can patch media
    if (this.constructor.name === 'MediaController' && request.user.role !== 'admin') {
      throw new UnauthorizedError();
    }

    const result = await this.constructor.dataMapper.update(request.body);

    // Check if the result is not null or undefined
    if (result === null || result === undefined) {
      throw new NoRessourceFoundError();
    }

    // Check if the instructions are correct
    if (!result) {
      throw new UnprocessableEntityError();
    }
    const responseObject = { statut: 'success', data: {} };
    responseObject.data[this.constructor.dataNames[0]] = result;
    response.json(responseObject);
  };

  /**
   * remove one entry in a table
   *
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Promise<void>} - Promise that resolves when the response is sent
   */
  deleteOne = async (request, response) => {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;

    // condition so that the user can only delete their own account
    if (this.constructor.name === 'UserController' && Number(request.user.id) !== Number(request.params.id) && request.user.role === 'admin') {
      throw new UnauthorizedError();
    }

    // condition so that the user can only delete their own account
    if (this.constructor.name === 'UserController' && Number(request.user.id) !== Number(request.params.id)) {
      throw new UnauthorizedError();
    }

    // Check if the user is authorized to delete an entry because of is role
    if (this.constructor.name === 'MediaController' && request.user.role !== 'admin') {
      throw new UnauthorizedError();
    }

    const deleteCount = await this.constructor.dataMapper.delete(id);

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

export default CoreController;
