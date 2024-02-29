/* eslint-disable max-len */
import { Router } from 'express';
import userController from '../controllers/api/user.js';
import controllerHandler from '../controllers/helpers/controllerHandler.js';
import authenticateToken from '../middleware/authenticateToken.js';
import validate from '../validations/validate.js';
import * as userSchemas from '../validations/schemas/userSchemas.js';
import * as idSchemas from '../validations/schemas/idSchemas.js';
import checkAdminRole from '../middleware/checkAdminRole.js';

const router = Router();
/**
 * @typedef {object} User
 * @property {string} first_name.required - First name of the user - ex: John
 * @property {string} last_name.required - Last name of the user - ex: Doe
 * @property {string} phone.required - Email of the user - ex: 123456789
 * @property {string} email.required - Email of the user - ex: john.doe@example.com
 */

/**
 * @typedef {object} UserFordgotPassword
 * @property {string} email.required - Email of the user - ex: john.doe@example.com
 */

/**
 * @typedef {object} UserResetPassword
 * @property {string} newPassword.required - Password of the user - ex: password
 * @property {string} resetToken.required - Token of the user - ex: token
 */

/**
 * @typedef {object} ChangePassword
 * @property {string} oldPassword.required - Old password of the user - ex: password
 * @property {string} newPassword.required - New password of the user - ex: password
 */

/**
 * @typedef {object} RegisterUser
 * @property {string} first_name.required - First name of the user - ex: John
 * @property {string} last_name.required - Last name of the user - ex: Doe
 * @property {string} phone.required - Email of the user - ex:123456789
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
 * @property {number} vat.required - Total price of the products - ex: 10
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
 * @property {number} vat.required - Total price of the products - ex: 10
 */

/**
 * POST /users/register
 * @summary Register user
 * @tags User
 * @param   {[RegisterUser]}  request.body      [user registration details]
 *
 * @return  {[object]}  200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/register', validate(userSchemas.registerSchema.post, 'body'), controllerHandler(userController.register.bind(userController)));

/**
 * POST /users/login
 * @summary Login user
 * @tags User
 * @param   {[LoginUser]}  request.body      [user login details]
 *
 * @return  {[object]}  200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 401 - Unauthorized - application/json
 * @example response - 401 - Example of unauthorized response
 * {
 * "message": "Invalid password"
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/login', validate(userSchemas.loginSchema.post, 'body'), controllerHandler(userController.login.bind(userController)));

/**
 * GET /users/
 * @summary Get all user
 * @tags User
 * @return {User} 200 - User created - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/', validate(userSchemas.userSchema.post, 'body'), controllerHandler(userController.create.bind(userController)));

/**
 * POST /users/forgot-password
 * @summary Forgot password
 * @tags UserFordgotPassword
 * @param   {[UserFordgotPassword]}  request.body      [user email]
 * @return  {[object]}  200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @return {object} 400 - Bad request - application/json
 */
router.post('/forgot-password', validate(userSchemas.forgotPasswordSchema.post, 'body'), userController.forgotPassword);

/**
 * POST /users/reset-password
 * @summary Reset password
 * @tags UserResetPassword
 * @param   {[UserResetPassword]}  request.body      [user newPassword]
 * @param {[UserResetPassword]} request.body -  [user resetToken]
 * @return  {[object]}  200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @return {object} 400 - Bad request - application/json
 */
router.post('/reset-password', validate(userSchemas.resetPasswordSchema.post, 'body'), userController.resetPassword);
/**
 * GET /users/
 * @summary Get all user
 * @tags User
 * @security bearerAuth
 * @return {User} 200 - User created - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.get('/', authenticateToken, checkAdminRole, controllerHandler(userController.getAll.bind(userController)));

/**
 * GET /users/{id}
 * @summary Get one user
 * @tags User
 * @security bearerAuth
 * @param {number} id.path.required - id of the user to get
 * @return {User} 200 - User created - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 *
 */

router.get('/:id', authenticateToken, validate(idSchemas.default.idUrl, 'query'), controllerHandler(userController.getOne.bind(userController)));

/**
 * GET /users/{id}/orders
 * @summary Get all orders of one user
 * @security bearerAuth
 * @tags User
 * @param {number} id.path.required - id of the user to get
 * @return {[UserOrder]} 200 - User created - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */

router.get('/:id/orders', authenticateToken, validate(idSchemas.default.idUrl, 'query'), controllerHandler(userController.getAllOrdersOfUser.bind(userController)));

/**
 * PATCH /users/{id}
 * @summary Update user
 * @tags User
 * @security bearerAuth
 * @param {number} id.path.required - id of the user to update
 * @param {User} request.body.required - User info
 * @return {User} 200 - User updated - application/json
* @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.patch('/:id', authenticateToken, validate(userSchemas.userSchema.patch, 'body'), controllerHandler(userController.update.bind(userController)));

/**
 * POST /users/change-password
 * @summary Change password
 * @tags ChangePassword
 * @security bearerAuth
 * @param {ChangePassword} request.body.required - Change password info
 * @return {object} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 */
router.post('/change-password', authenticateToken, validate(userSchemas.changePasswordSchema.post, 'body'), controllerHandler(userController.changePassword.bind(userController)));
/**
 * DELETE /users/{id}
 * @summary Delete user
 * @tags User
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @return  {[]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The request cannot be fulfilled due to bad syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.delete('/:id', authenticateToken, validate(idSchemas.default.idUrl, 'query'), controllerHandler(userController.deleteOne.bind(userController)));

export default router;
