import { Router } from 'express';
import orderHasProductController from '../controllers/api/orderHasProduct.js';
import orderController from '../controllers/api/order.js';

const router = Router();

router.post('/', orderController.create);
router.post('/details', orderHasProductController.create);

export default router;
