import { Router } from 'express';
import userController from '../controllers/api/user.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = Router();
/**
 * @typedef {object} User
 * @property {string} first_name.required - First name of the user - ex: John
 * @property {string} last_name.required - Last name of the user - ex: Doe
 * @property {string} email.required - Email of the user - ex: john.doe@example.com
 */

/**
 * @typedef {object} RegisterUser
 * @property {string} first_name.required - First name of the user - ex: John
 * @property {string} last_name.required - Last name of the user - ex: Doe
 * @property {string} email.required - Email of the user - ex: john.doe@example.com
 * @property {string} password.required - Password of the user - ex: password
 */

/**
 * @typedef {object} LoginUser
 * @property {string} email.required - Email of the user - ex: john.doe@example.com
 * @property {string} password.required - Password of the user - ex: password
 */

/**
 * @typedef {object} Order
 * @property {string} first_name.required - First name of the user - ex: John
 * @property {string} last_name.required - Last name of the user - ex: Doe
 * @property {string} total_price.required - Total price of the order - ex: 100
 * @property {string} status.required - Status of the order - ex: pending
 * @property {number} user_id.required - User ID - ex: 1
 */

/**
 * @typedef {object} OrderHasProduct
 * @property {number} order_id.required - Order ID - ex: 1
 * @property {number} product_id.required - Product ID - ex: 1
 * @property {number} quantity.required - Quantity of the product - ex: 1
 * @property {number} price_time_order.required - Price of the product - ex: 100
 * @property {number} subtotal_price.required - Total price of the products - ex: 10
 */

/**
 * @typedef {object} UserOrder
 * @property {string} first_name.required - First name of the user - ex: John
 * @property {string} last_name.required - Last name of the user - ex: Doe
 * @property {string} total_price.required - Total price of the order - ex: 100
 * @property {string} status.required - Status of the order - ex: pending
 * @property {number} user_id.required - User ID - ex: 1
 * @property {number} order_id.required - Order ID - ex: 1
 * @property {number} product_id.required - Product ID - ex: 1
 * @property {number} quantity.required - Quantity of the product - ex: 1
 * @property {number} price_time_order.required - Price of the product - ex: 100
 * @property {number} subtotal_price.required - Total price of the products - ex: 10
 */

/**
 * POST /users/register
 * @summary Register user
 * @tags User
 * @param   {[RegisterUser]}  request.body      [user registration details]
 *
 * @return  {[object]}  200 -              [success response]
 * @return {[object]}   500 -              [internal server error]
 */
router.post('/register', userController.register);

/**
 * POST /users/login
 * @summary Login user
 * @tags User
 * @param   {[LoginUser]}  request.body      [user login details]
 *
 * @return  {[object]}  200 -              [success response]
 * @return {[object]}   500 -              [internal server error]
 */
router.post('/login', userController.login);

/**
 * GET /users/
 * @summary Get all user
 * @tags User
 * @return {User} 200 - User created - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 500 - Internal server error - application/json
 */

router.get('/', userController.getAll);

/**
 * GET /users/{id}
 * @summary Get one user
 * @tags User
 * @security BearerAuth
 * @param {number} id.path.required - id of the user to get
 * @return {User} 200 - User created - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 500 - Internal server error - application/json
 *
 */
router.get('/:id([0-9]+)', authenticateToken, userController.getOne);

/**
 * GET /users/{id}/orders
 *@summary Get all orders of one user
 * @tags User
 * @return {[UserOrder]} 200 - User created - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 500 - Internal server error - application/json
 */
router.get('/:id([0-9]+)/orders', authenticateToken, userController.getAllOrdersOfUser);

router.post('/', userController.create);

/**
 * PATCH /users/{id}
 * @summary Update user
 * @tags User
 * @param {number} id.path.required - id of the user to update
 * @param {User} request.body.required - User info
 * @return {User} 200 - User updated - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 404 - User not found - application/json
 * @return {object} 500 - Internal server error - application/json
 */
router.patch('/:id', authenticateToken, userController.update);

/**
 * DELETE /users/{id}
 * @summary Delete user
 * @tags User
 *
 * @param   {[number]} id.path          [id description]
 * @return  {[]} 200 -              [success response]
 * @return {[object]}  422 -            [unprocessable entity error]
 */

router.delete('/:id', authenticateToken, userController.deleteOne);

export default router;
