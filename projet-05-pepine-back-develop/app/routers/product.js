import { Router } from 'express';
import productController from '../controllers/api/product.js';
import mediaController from '../controllers/api/media.js';
import productHasMediaController from '../controllers/api/productHasMedia.js';
import productHasCategoryController from '../controllers/api/productHasCategory.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id([0-9]+)', productController.getOne);

router.post('/', productController.create);
router.post('/media', mediaController.create);
router.post('/media/order', productHasMediaController.create);
router.post('/category', productHasCategoryController.create);

/**
 * PATCH api/product/{id}
 * @summary Update product
 * @tags Product
 *
 * @param   {[number]} id.path          [id description]
 * @param   {[Product]}  request.body      [product description]
 *
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.patch('/:id', productController.update);

export default router;
