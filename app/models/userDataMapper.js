import Debug from 'debug';
import bcrypt from 'bcrypt';
import client from './helpers/database.js';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:user');

// Create a user data mapper
/**
 * A class representing a user data mapper that extends CoreDataMapper.
 * @extends CoreDataMapper
 */
class UserDataMapper extends CoreDataMapper {
  static tableName = 'user';

  // insertfunction created in postgresql
  static insertFunc = 'create_user';

  // update function created in postgresql
  static updateFunc = 'update_user';

  static getAllOrdersview = 'getAllOrders';

  /**
   * Fetch all orders from a user.
   *
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Array>} An array of orders.
   */
  async findAllOrdersOfUser(userId) {
    debug(`${this.constructor.name} findAllOrdersOfUser(${userId})`);
    const dataSource = this.constructor.getAllOrdersview;
    const preparedQuery = {
      text: `SELECT * FROM ${dataSource} WHERE user_id=$1`,
      values: [userId],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * Creates a user.
   *
   * @param {object} userData - The user data.
   * @param {string} userData.email - The user email.
   * @param {string} userData.phone - The user phone.
   * @param {string} userData.password - The user password.
   * @param {string} userData.firstname - The user firstname.
   * @param {string} userData.lastname - The user lastname.
   * @returns {Promise<object>} The created user.
   */
  async createUser(userData) {
    debug('Creating User');
    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // create user with hashed password
    const userWithHashedPassword = {
      ...userData, // rest paramater
      password: hashedPassword,
    };
    // call sql function
    const query = {
      text: `SELECT * FROM ${this.constructor.insertFunc}($1)`,
      values: [JSON.stringify(userWithHashedPassword)],
    };
    const { rows } = await client.query(query);
    const user = rows[0];
    debug('User created');

    return user;
  }

  /**
   * Finds a user by email.
   *
   * @param {string} email - The user email.
   * @returns {Promise<object>} The found user.
   * @throws {Error} If user not found.
   */
  async findUserByEmail(email) {
    debug('Finding user by email');
    debug(`SQL function ${this.constructor.tableName} called`);
    // call sql function
    const query = {
      text: `SELECT * FROM "${this.constructor.tableName}" WHERE email = $1`,
      values: [email],
    };
    const { rows } = await client.query(query);
    const user = rows[0];
    debug('User found');

    return user;
  }

  async saveResetToken(resetToken, userId) {
    debug('Saving reset token');
    // call sql function
    const query = {
      text: `UPDATE "${this.constructor.tableName}" SET reset_token=$1 WHERE id=$2`,
      values: [resetToken, userId],
    };
    const result = await client.query(query);
    return result;
  }

  async updatePassword(hachedPassword, userId) {
    debug('Saving new hached password');
    // call sql function
    const query = {
      text: `UPDATE "${this.constructor.tableName}" SET password=$1 WHERE id=$2`,
      values: [hachedPassword, userId],
    };
    const result = await client.query(query);
    return result;
  }

  async clearResetToken(userId) {
    debug('Clear reset token');
    // call sql function
    const query = {
      text: `UPDATE "${this.constructor.tableName}" SET reset_token=$1 WHERE id=$2`,
      values: ['', userId],
    };
    const result = await client.query(query);
    return result;
  }

  /**
   * Creates a new instance of UserDataMapper.
   */
  constructor() {
    super();
    debug('user data mapper created');
  }
}

export default new UserDataMapper();
