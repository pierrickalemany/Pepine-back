import Debug from 'debug';

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
    const responseObject = { status: 'success', data: { } };
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
    const responseObject = { status: 'success', data: { } };
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
    const responseObject = { status: 'success', data: {} };
    responseObject.data[this.constructor.dataNames[0]] = result;
    response.json(responseObject);
  };

  /**
   * Update a resource by ID.
   * @async
   * @function update
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
   */
  update = async (request, response) => {
    debug(`${this.constructor.name} update`);
    request.body.id = request.params.id;
    const result = await this.constructor.dataMapper.update(request.body);
    const responseObject = { status: 'success', data: {} };
    responseObject.data[this.constructor.dataNames[0]] = result;
    response.json(responseObject);
  };
}

export default CoreController;
