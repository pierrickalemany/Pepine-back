/* eslint-disable max-len */
import { Router } from 'express';
import orderHasProductController from '../controllers/api/orderHasProduct.js';
import orderController from '../controllers/api/order.js';
import controllerHandler from '../controllers/helpers/controllerHandler.js';
import authenticateToken from '../middleware/authenticateToken.js';
import validate from '../validations/validate.js';
import * as orderSchemas from '../validations/schemas/orderSchemas.js';
import * as idSchemas from '../validations/schemas/idSchemas.js';
import checkAdminRole from '../middleware/checkAdminRole.js';

const router = Router();
/**
 * @typedef {object} Order
 * @property {string} first_name_order.required - First name of the user - ex: John
 * @property {string} last_name_order.required - Last name of the user - ex: Doe
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
 * @typedef {object} OrderComplete
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
 * @typedef {object} PatchOrder
 * @property {string} newStatus.required - Status of the order - ex: pending
 */

/**
 * @typedef {object} OrderStatus
 * @returns {string} status - update_order_status: - ex: pending
 */

/**
 * GET /orders/
 * @summary Get all orders
 * @tags Order
 * @security bearerAuth
 * @return {[OrderComplete]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 *  "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."

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
 * @return {object} 422 - Unprocessable Entity - application/json
 * @example response - 422 - Example of Unprocessable Entity
 * {
 *    "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.get('/', authenticateToken, checkAdminRole, controllerHandler(orderController.getAllOrders.bind(orderController)));

/**
 * GET /orders/{id}
 * @summary Get a order by ID
 * @tags Order
 * @security bearerAuth
 * @param   {[number]} id.path [id description]
 * @return  {[OrderComplete]} 200 - Success response - application/json
 * @return {[object]}  404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The order with the specified ID was not found."
 * }
 * @return {[object]}  500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {[object]}  400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The server could not understand the request due to invalid syntax."
 * }
 * @return {[object]}  422 - Unprocessable Entity - application/json
 * @example response - 422 - Example of Unprocessable Entity
 * {
 *     "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */

router.get('/:id', validate(idSchemas.default.idUrl, 'query'), authenticateToken, controllerHandler(orderController.getOneOrder.bind(orderController)));

/**
 * POST /orders/
 * @summary Create order
 * @tags Order
 * @security bearerAuth
 * @param   {[Order]}  request.body      [order description]
 * @return  {[Order]} 200 - Success response - application/json
 * @return {[object]}  422 - Unprocessable Entity - application/json
 * @example request - 422 - Example of  Unprocessable Entity
 * {
 *      "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 * @return {[object]}  500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 *   "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {[object]}  400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "THe server could not understand the request due to invalid syntax."
 * }
 * @return {[object]}  404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The ressource you attempted to create could not be found."
 * }
 */

router.post('/', authenticateToken, validate(orderSchemas.orderSchema.post, 'body'), controllerHandler(orderController.create.bind(orderController)));

/**
 * POST /orders/details
 * @summary Create order_has_product
 * @tags OrderHasProduct
 * @security bearerAuth
 * @param   {[OrderHasProduct]}  request.body- Array of the order product relationship
 * @param {array} request.body.productHasMedia - Array of ProductHasMedia objects
 * @return  {[OrderHasProduct]} 200 - Success response - application/json
 * @return {object} 422 - Unprocessable Entity - application/json
 * @example response - 422 - Example of Unprocessable Entity
 * {
 *      "message": "The data provided cannot be processed. Please check the product and order IDs."
 * }
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 *   "message": "The server encountered an issue while creating the order product details. Please try again."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The server could not understand the request due to invalid syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The ressource you attempted to create could not be found."
 * }
 */

router.post('/details', authenticateToken, validate(orderSchemas.orderHasProductSchema, 'body'), controllerHandler(orderHasProductController.create.bind(orderHasProductController)));

/**
 * PATCH /orders/{id}/update-status
 * @summary Update order status
 * @tags Order
 * @security bearerAuth
 * @param   {number} id.path.required - ID of the order to update
 * @param   {[PatchOrder]}  request.body.required - New status for the order
 * @return  {[PatchOrder]} 200 - Success response - application/json
 * @return {object} 422 - Unprocessable Entity - application/json
 * @example response - 422 - Example of Unprocessable Entity
 * {
 *      "message": "The status provided is not recognized or cannot be applied to the order at its current state."
 * }
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 *   "message": "The server encountered an unexpected condition that prevented it from updating the order status."
 * }
 * @return {object} 400 - Bad request - application/json
 * @example response - 400 - Example of bad request response
 * {
 * "message": "The server could not understand the request due to invalid syntax."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The ressource you attempted to update could not be found."
 * }
 */
router.patch('/:id/update-status', authenticateToken, validate(orderSchemas.orderSchema.patch, 'body'), controllerHandler(orderController.updateOrderStatus.bind(orderController)));

export default router;
