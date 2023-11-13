import Debug from 'debug';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CoreController from './CoreController.js';
import userDataMapper from '../../models/userDataMapper.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';
import UnauthorizedError from '../../errors/Unauthorized.js';
import InternalServerError from '../../errors/InternalServerError.js';
import ConflictError from '../../errors/ConflictError.js';

const debug = Debug('pepine:controllers:user');

/** Class representing a user controller. */
/**
 * A controller class for handling user-related API requests.
 * @class
 * @extends CoreController
 * @memberof module:controllers/api
 */
class UserController extends CoreController {
  /**
   * The data mapper for the user controller.
   * @static
   * @type {Object}
   * @memberof module:controllers/api/UserController
   */
  static dataMapper = userDataMapper;

  /**
   * The name of the table in the PostgreSQL database.
   * @static
   * @type {string}
   * @memberof module:controllers/api/UserController
   */
  static dataNames = 'user';

  /**
   * Responds with all orders of a user.
   *
   * @async
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
   * @memberof module:controllers/api/UserController
   */
  getAllOrdersOfUser = async (request, response) => {
    debug(`${this.constructor.name} getAllOrdersOfUser`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findAllOrdersOfUser(id);

    // Check if the result is not null
    if (!results) {
      throw new NoRessourceFoundError();
    }

    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);
  };

  /**
   * Creates a new user.
   *
   * @async
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
   * @memberof module:controllers/api/UserController
   */
  register = async (request, response) => {
    debug(`${this.constructor.name} register`);
    // Check if user exists
    const user = await this.constructor.dataMapper.findUserByEmail(request.body.email);
    if (user) {
      throw new ConflictError();
    }
    // Creates a new user using the data from the request body.
    const newUser = await this.constructor.dataMapper.createUser(request.body);
    // remove password from response
    delete newUser.password;
    // Check if the new user was created
    if (newUser) {
      response.status(201).json({
        status: 'success',
        data: newUser,
      });
    } else {
      throw new InternalServerError();
    }
  };

  /**
   * Logs in an existing user.
   *
   * @async
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
   * @memberof module:controllers/api/UserController
   */
  login = async (request, response) => {
    debug(`${this.constructor.name} login`);
    // Check if user exists
    const user = await this.constructor.dataMapper.findUserByEmail(request.body.email);
    if (!user) {
      throw new NoRessourceFoundError();
    }
    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(request.body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }
    /**
       * Generates a JSON Web Token (JWT) for the given user ID.
       *
       * @constant {string} token
       * @memberof module:controllers/api/user
       * @param {number} user.id - The ID of the user to generate the token for.
       * @returns {string} The generated JWT.
       */
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '23h' });
    if (token) {
      response.status(200).json({
        status: 'success',
        data: { token },
      });
    } else {
      throw new InternalServerError();
    }
  };
}

export default new UserController();
