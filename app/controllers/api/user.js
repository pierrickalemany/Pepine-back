import Debug from 'debug';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CoreController from './CoreController.js';
import userDataMapper from '../../models/userDataMapper.js';

const debug = Debug('pepine:controllers:user');

/** Class representing a user controller. */
class UserController extends CoreController {
  static dataMapper = userDataMapper;

  // table name in postgresql
  static dataNames = 'user';

  /**
   * responds with all entries from one entry from a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  getAllOrdersOfUser = async (request, response) => {
    debug(`${this.constructor.name} getAllOrdersOfUser`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findAllOrdersOfUser(id);
    const responseObject = { statut: 'success', data: { } };
    responseObject.data[this.constructor.dataNames] = results;
    response.json(responseObject);
  };

  /**
   * create a user controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('user controller created');
  }

  /**
   * Register a new user
   * @param {Object} request
   * @param {Object} response
   */

  register = async (request, response) => {
    debug(`${this.constructor.name} register`);

    try {
      // Check if user exists
      const user = await this.constructor.dataMapper.findUserByEmail(request.body.email);
      if (user) {
        return response.status(409).json({ error: 'User already exists' });
      }

      // Creates a new user using the data from the request body.
      const newUser = await this.constructor.dataMapper.createUser(request.body);
      // remove password from response
      delete newUser.password;
      response.status(201).json(newUser);
    } catch (error) {
      debug('Error creating user:', error);
      response.status(500).json({ error: error.message });
    }
    return null;
  };

  /**
   * Login an existing user
   * @param {Object} request
   * @param {Object} response
   */

  login = async (request, response) => {
    debug(`${this.constructor.name} login`);
    try {
      // Check if user exists
      const user = await this.constructor.dataMapper.findUserByEmail(request.body.email);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
      // Check if password is valid
      const isPasswordValid = await bcrypt.compare(request.body.password, user.password);
      if (!isPasswordValid) {
        return response.status(401).json({ error: 'Invalid password' });
      }
      /**
       * Generates a JSON Web Token (JWT) for the given user ID.
       *
       * @constant {string} token
       * @memberof module:controllers/api/user
       * @param {number} user.id - The ID of the user to generate the token for.
       * @returns {string} The generated JWT.
       */
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      response.json({ token });
    } catch (error) {
      debug('Error login user:', error);
      response.status(500).json({ error: error.message });
    }
    return null;
  };
}

export default new UserController();
