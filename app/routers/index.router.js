import { Router } from 'express';
import userRouter from './user.js';
import productRouter from './product.js';
import orderRouter from './order.js';
import categoryRouter from './category.js';

/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */
const router = Router();

router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/orders', orderRouter);

router.use('/categories', categoryRouter);

export default router;
