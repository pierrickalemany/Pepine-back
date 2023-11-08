import { Router } from 'express';
import orderHasProductController from '../controllers/api/orderHasProduct.js';
import orderController from '../controllers/api/order.js';
import controllerHandler from '../controllers/helpers/controllerHandler.js';
import authenticateToken from '../middleware/authenticateToken.js';


const router = Router();
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
 * @property {number} subtotal_price.required - Total price of the products - ex: 10
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
 * @return {[OrderComplete]} 200 - *Success response*
 * @return {object} 500 - *Internal server error*
 * @return {object} 400 - *Bad request*
 * @return {object} 404 - *Not found*
 */
router.get('/', authenticateToken, orderController.getAllOrders);

/**
 * GET /orders/{id}
 * @summary Get a order by ID
 * @tags Order
 * @security bearerAuth
 * @param   {[number]} id.path [id description]
 * @return  {[OrderComplete]} 200 - [success response]
 * @return {[object]}  404 -            [not found]
 * @return {[object]}  500 - [internal server error]
 */

router.get('/:id([0-9]+)', authenticateToken, orderController.getOneOrder);

/**
 * POST /orders/
 * @summary Create order
 * @tags Order
 * @security bearerAuth
 * @param   {[Order]}  request.body      [order description]
 * @return  {[Order]} 200 -              [success response]
 * @return {[object]}  422 -            [Unprocessable Entity]
 * @return {[object]}  500 -            [internal server error]
 */

router.post('/', authenticateToken, controllerHandler(orderController.create.bind(orderController)));

/**
 * POST /orders/details
 * @summary Create order_has_product
 * @tags OrderHasProduct
 * @security bearerAuth
 * @param   {[OrderHasProduct]}  request.body      [order description]
 * @return  {[OrderHasProduct]} 200 -              [success response]
 * @return {[object]}  422 -            [Unprocessable Entity]
 * @return {[object]}  500 -            [internal server error]
 */

router.post('/details', authenticateToken, controllerHandler(orderHasProductController.create.bind(orderHasProductController)));

/**
 * PATCH /orders/{id}/update-status
 * @summary Update order status
 * @tags Order
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @param   {[PatchOrder]}  request.body      [order description]
 * @return  {[PatchOrder]} 200 -              [success response]
 * @return {[object]}  422 -            [Unprocessable Entity]
 * @return {[object]}  500 -            [internal server error]
 */

router.patch('/:id/update-status', authenticateToken, controllerHandler(orderController.updateOrderStatus.bind(orderController)));


export default router;
