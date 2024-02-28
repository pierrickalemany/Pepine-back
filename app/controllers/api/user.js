import Debug from 'debug';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CoreController from './CoreController.js';
import userDataMapper from '../../models/userDataMapper.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';
import UnauthorizedError from '../../errors/Unauthorized.js';
import InternalServerError from '../../errors/InternalServerError.js';
import ConflictError from '../../errors/ConflictError.js';
import sendPasswordResetEmail from '../../middleware/sendEmail.js';

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
   * @function getAllOrdersOfUser
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
   */
  getAllOrdersOfUser = async (request, response) => {
    debug(`${this.constructor.name} getAllOrdersOfUser`);
    const { id } = request.params;
    // Check if the user asking for the orders is the same as the user in the request
    if (request.user.role !== 'admin' && String(request.user.id) !== String(id)) {
      throw new UnauthorizedError();
    }
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

  /**
 * Generate a reset token for the user and send an email to reset the password
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 */
  forgotPassword = async (request, response) => {
    const { email } = request.body;

    try {
      // Find the user by email
      const user = await this.constructor.dataMapper.findUserByEmail(email);
      const userId = user.id;
      if (!user) {
        throw new NoRessourceFoundError();
      }
      // Generate and save a reset token for the user
      debug('Token is generated');
      const resetToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      await this.constructor.dataMapper.saveResetToken(resetToken, user.id);

      // Send password reset email
      await sendPasswordResetEmail(email, resetToken);
      debug('Password reset email sent successfully');

      response.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      debug('Forgot password error:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  };

  /**
   * change the user's password
   * @async
   * @param {*} request
   * @param {*} response
   * @returns
   */
  changePassword = async (request, response) => {
    const { oldPassword, newPassword } = request.body;
    try {
      // Find the user by email
      const user = await this.constructor.dataMapper.findByPk(request.user.id);
      if (!user) {
        throw new NoRessourceFoundError();
      }
      // Check if the old password is valid
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError();
      }
      // Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.constructor.dataMapper.updatePassword(hashedPassword, user.id);

      response.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      debug('Change password error:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  };

  /**
 *  Reset the user's password
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 * @returns
 */
  resetPassword = async (request, response) => {
    const { resetToken, newPassword } = request.body;
    try {
      // Verify the reset token
      const verifiedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
      debug('token is decoded successfully');

      const user = await this.constructor.dataMapper.findByPk(verifiedToken.userId);
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      // Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.constructor.dataMapper.updatePassword(hashedPassword, user.id);

      // Clear the reset token after password reset
      await this.constructor.dataMapper.clearResetToken(user.id);

      return response.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      debug('Reset password error:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
    return null;
  };
}

export default new UserController();
