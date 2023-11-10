import { Router } from 'express';
import userRouter from './user.js';
import productRouter from './product.js';
import orderRouter from './order.js';
import NoResourceFoundError from '../errors/NoRessourceFoundError.js';
import apiErrorHandler from '../errors/helpers/apiErrorHandler.js';
import apiController from '../controllers/api/index.js';
import categoryRouter from './category.js';

/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */
const router = Router();

/**
 * GET /api
*
* @summary get API documentation URL
* @tags Docs - The blog's API documentation
 *
 * @return {object} 200 - success response
*/

router.all('/', apiController.getHome);

router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/orders', orderRouter);

router.use('/categories', categoryRouter);

router.use((request, response, next) => {
  next(new NoResourceFoundError());
});

router.use(apiErrorHandler);

export default router;
