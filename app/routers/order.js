import { Router } from 'express';
import orderHasProductController from '../controllers/api/orderHasProduct.js';
import orderController from '../controllers/api/order.js';

const router = Router();

/**
 * POST api/product/
 * @summary Create order
 * @tags Order
 * @param   {[Product]}  request.body      [product description]
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/', orderController.create);

/**
 * POST api/product/details
 * @summary Create order_has_product
 * @tags Order
 * @param   {[Product]}  request.body      [product description]
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/details', orderHasProductController.create);

export default router;
