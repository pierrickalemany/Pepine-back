import Debug from 'debug';
import bcrypt from 'bcrypt';
import client from './helpers/database.js';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:user');

// Create a user data mapper
class UserDataMapper extends CoreDataMapper {
  static tableName = 'user';

  // insertfunction created in postgresql
  static insertFunc = 'create_user';

  // update function created in postgresql
  static updateFunc = 'update_user';

  static getAllOrdersview = 'getAllOrders';

  /**
   * fetch all order from a user
   *
   * @param {number} id - id of the entry
   * @returns {array} array of entries
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
   * create a user data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('user data mapper created');
  }

  /**
   * create a user
   * @param {object} user - user to create
   * @param {string} user.email - user email
   * @param {string} user.password - user password
   * @param {string} user.firstname - user firstname
   * @param {string} user.lastname - user lastname
   *
   * @returns {Promise<object>} created user
   */

  async createUser(userData) {
    debug('Creating User');
    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // create user with hashed password
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };
    // call sql function
    const query = {
      text: `SELECT * FROM ${this.constructor.insertFunc}($1)`,
      values: [JSON.stringify(userWithHashedPassword)],
    };

    try {
      const { rows } = await client.query(query);
      const user = rows[0];
      debug('User created');
      return user;
    } catch (error) {
      debug('Error creating user:', error);
      throw error;
    }
  }

  /**
   * find a user by email
   * @param {string} email - user email
   * @returns {Promise<object>} found user
   * @returns {Promise<undefined>} if user not found
   * @returns {Promise<Error>} if error
   * @throws {Error} if user not found
   *
  */

  async findUserByEmail(email) {
    debug('Finding user by email');
    debug(`SQL function ${this.constructor.tableName} called`);
    // call sql function
    const query = {
      text: `SELECT * FROM "${this.constructor.tableName}" WHERE email = $1`,
      values: [email],
    };
    try {
      const { rows } = await client.query(query);
      const user = rows[0];
      debug('User found. Connexion successfull');

      return user;
    } catch (error) {
      debug('Error finding user:', error);
      throw error;
    }
  }
}

export default new UserDataMapper();
