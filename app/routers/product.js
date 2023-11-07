import { Router } from 'express';
import productController from '../controllers/api/product.js';
import mediaController from '../controllers/api/media.js';
import productHasMediaController from '../controllers/api/productHasMedia.js';
import productHasCategoryController from '../controllers/api/productHasCategory.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = Router();
/**
 * @typedef {object} Product
 * @property {string} name.required - Name of the product - ex: Basilic
 * @property {string} scientific_name.required - Scientific name - ex: Ocimum basilicum
 * @property {string} maturity_height - Maturity height of the product - ex: 30cm
 * @property {string} maturity_width - Maturity width of the product - ex: 20cm
 * @property {string} family - Family of the product - ex: Lamiaceae
 * @property {string} origin - Origin of the product - ex: Asia
 * @property {string} flower_color - Color of the product's flowers - ex: White
 * @property {string} leaf_color - Color of the product's leaves - ex: Green
 * @property {string} description1 - Detailed description of the product - ex: lorem ipsum
 * @property {string} description2 - Second description of the product - ex: lorem ipsum
 * @property {string} size - Size of the product - ex: 10cm
 * @property {string} pot - Pot size - ex: 15cm
 * @property {number} stock - Quantity in stock of the product - ex: 10
 * @property {number} price - Price of the product - ex: 10.00
 * @property {number} vat - Applicable VAT rate for the product - ex: 20
 * @property {string} status.required - Status of the product - ex: published
 * @property {number} user_id - ID of the user associated with the product - ex: 1
 * @property {number} yield_id - ID of the product's yield - ex: 1
 * @property {number} hardiness_zone_id - ID of the product's hardiness zone - ex: 2
 * @property {number} water_requirement_id - ID of the product's water requirement - ex: 3
 * @property {number} exposure_id - ID of the product's sun exposure - ex: 4
 * @property {number} ground_cover_power_id - ID of the product's ground cover power - ex: 2
 * @property {number} strate_id - ID of the product's strate - ex: 1
 * @property {number} foliage_id - ID of the product's foliage - ex: 1
 * @property {number} media_order - Order of the product's media - ex: 1
 * @property {string} media_url - URL of the media - ex: https://example.com/media.jpg
 * @property {string} media_name - Name of the media - ex: basilic
 */

/**
 * @typedef {object} Media
 * @property {string} media_url.required - URL of the media - ex: https://example.com/media.jpg
 * @property {string} media_name.required - Name of the media - ex: basilic
 * @property {number} product_id.required - Associated product ID - ex: 1
 * @property {number} media_order.required - Order of the media - ex: 1
 */

/**
 * @typedef {object} MediaUrl
 * @property {string} media_url.required - URL of the media - ex: https://example.com/media.jpg
 * @property {string} media_name.required - Name of the media - ex: basilic
 */

/**
 * @typedef {object} ProductHasMedia
 * @property {number} product_id.required - Product ID - ex: 1
 * @property {number} media_id.required - Media ID - ex: 1
 * @property {number} media_order.required - Order of the media - ex: 1
 */

/**
 * @typedef {object} ProductHasCategory
 * @property {number} product_id.required - Product ID - ex: 1
 * @property {number} category_id.required - Category ID - ex: 1
 */

/**
 * GET /products/
 * @summary Get all products
 * @tags Product
 * @produces application/json
 * @return {[Product]} 200 - *Success response*
 * @return {object} 500 - *Internal server error*
 */

router.get('/', productController.getAll);

/**
 * GET /products/{id}
 * @summary Get a product by ID
 * @tags Product
 *
 * @param   {[number]} id.path [id description]
 *
 * @return  {[Product]} 200 - [success response]
 * @return {[object]}  404 -            [not found]
 * @return {[object]}  500 - [internal server error]
 */
router.get('/:id([0-9]+)', productController.getOne);

/**
 * POST /products/
 * @summary Create a new product
 * @tags Product
 *
 * @param   {[Product]}  request.body [product description]
 *
 * @return  {[Product]} 200 - [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 - [internal server error]
 */
router.post('/', authenticateToken, productController.create);

/**
 * POST /products/media
 * @summary Create a new media for a product
 * @tags Product
 *
 * @param   {[MediaUrl]}  request.body [media description]
 *
 * @return  {[MediaUrl]} 200 - [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 - [internal server error]
 */
router.post('/media', authenticateToken, mediaController.create);

/**
 * POST /products/media/order
 * @summary Create a new order for product media
 * @tags Product
 *
 * @param   {[ProductHasMedia]}  request.body [product media description]
 *
 * @return  {[ProductHasMedia]} 200 - [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 - [internal server error]
 */
router.post('/media/order', authenticateToken, productHasMediaController.create);

/**
 * POST /products/category
 * @summary Create a new category for a product
 * @tags Product
 *
 * @param   {[ProductHasCategory]}  request.body [product category description]
 *
 * @return  {[ProductHasCategory]} 200 - [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 - [internal server error]
 */
router.post('/category', authenticateToken, productHasCategoryController.create);

/**
 * PATCH /products/{id}
 * @summary Update a product by ID
 * @tags Product
 *
 * @param   {[number]} id.path          [id description]
 * @param   {[Product]}  request.body      [product description]
 *
 * @return  {[Product]} 200 -              [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 -            [internal server error]
 */
router.patch('/:id', authenticateToken, productController.update);

/**
 * PATCH /products/{id}/categories
 * @summary Update product categories by ID
 * @tags Product
 *
 * @param   {[number]} id.path          [id description]
 * @param   {[ProductHasCategory]}  request.body      [product category description]
 *
 * @return  {[ProductHasCategory]} 200 -              [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 -            [internal server error]
 */
router.patch('/:id/categories', authenticateToken, productHasCategoryController.updateProductCategories);

/**
 * PATCH /products/{id}/media
 * @summary Update product medias by ID
 * @tags Product
 *
 * @param   {[number]} id.path          [id description]
 * @param   {[Media]}  request.body      [product media description]
 *
 * @return  {[Media, ProductHasMedia]} 200 -              [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  500 -            [internal server error]
 */
router.patch('/:id/media', authenticateToken, productHasMediaController.updateProductMedias);

/**
 * DELETE producte/media/{id}
 * @summary Delete a media by ID
 * @tags Product
 *
 * @param   {[number]} id.path          [id description]
 * @return  {[]} 200 -              [success response]
 * @return {[object]}  400 -            [bad request]
 * @return {[object]}  422 -            [unprocessable entity error]
 */
router.delete('/media/:id', authenticateToken, mediaController.deleteOne);

export default router;
