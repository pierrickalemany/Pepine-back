import { Router } from 'express';
import productController from '../controllers/api/product.js';
import mediaController from '../controllers/api/media.js';
import productHasMediaController from '../controllers/api/productHasMedia.js';
import productHasCategoryController from '../controllers/api/productHasCategory.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id([0-9]+)', productController.getOne);

/**
 * POST api/product
 * @summary Create product
 * @tags Product
 * @param   {[Product]}  request.body      [product description]
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/', productController.create);

/**
 * POST api/product/media
 * @summary Create media
 * @tags Media
 * @param   {[Media]}  request.body      [media description]
 * @return  {[Media]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/media', mediaController.create);

/**
 * POST api/product/media/order
 * @summary Create product_has_media
 * @tags Product
 * @param   {[Product]}  request.body      [product description]
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/media/order', productHasMediaController.create);

/**
 * POST api/product/category
 * @summary Create product_has_category
 * @tags Product
 * @param   {[Product]}  request.body      [product description]
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
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
