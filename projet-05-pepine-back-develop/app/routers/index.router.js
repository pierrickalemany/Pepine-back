import { Router } from 'express';
import userRouter from './user.js';
import productRouter from './product.js';
import orderRouter from './order.js';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);

export default router;
