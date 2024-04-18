/* eslint-disable max-len */
import { Router } from 'express';
import productController from '../controllers/api/product.js';
import mediaController from '../controllers/api/media.js';
import productHasMediaController from '../controllers/api/productHasMedia.js';
import productHasCategoryController from '../controllers/api/productHasCategory.js';
import controllerHandler from '../controllers/helpers/controllerHandler.js';
import authenticateToken from '../middleware/authenticateToken.js';
import validate from '../validations/validate.js';
import * as productSchemas from '../validations/schemas/productSchemas.js';
import * as idSchemas from '../validations/schemas/idSchemas.js';
import multerMiddleware from '../middleware/multerSharp.js';
import handleUploadedFiles from '../middleware/handleUploadedFiles.js';
import checkAdminRole from '../middleware/checkAdminRole.js';

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
 * @property {boolean} status.required - Status of the product - ex: published
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
 * @typedef {object} PostProduct
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
 * @property {boolean} status.required - Status of the product - ex: published
 * @property {number} user_id - ID of the user associated with the product - ex: 1
 * @property {number} yield_id - ID of the product's yield - ex: 1
 * @property {number} hardiness_zone_id - ID of the product's hardiness zone - ex: 2
 * @property {number} water_requirement_id - ID of the product's water requirement - ex: 3
 * @property {number} exposure_id - ID of the product's sun exposure - ex: 4
 * @property {number} ground_cover_power_id - ID of the product's ground cover power - ex: 2
 * @property {number} strate_id - ID of the product's strate - ex: 1
 * @property {number} foliage_id - ID of the product's foliage - ex: 1
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
 * @return {[Product]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */

router.get('/', controllerHandler(productController.getAll.bind(productController)));

/**
 * GET /products/{id}
 * @summary Get a product by ID
 * @tags Product
 *
 * @param   {[number]} id.path [id description]
 *
 * @return  {[Product]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.get('/:id', validate(idSchemas.default.idUrl, 'query'), controllerHandler(productController.getOne.bind(productController)));

/**
 * GET /products/update/{id}
 * @summary Get a product by ID to update
 * @tags Product
 * @security bearerAuth
 * @param   {[number]} id.path [id description]
 *
 * @return  {[Product]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.get('/update/:id', authenticateToken, checkAdminRole, validate(idSchemas.default.idUrl, 'query'), controllerHandler(productController.getProductToUpdate.bind(productController)));

/**
 * POST /products/
 * @summary Create a new product
 * @tags Product
 * @security bearerAuth
 * @param   {[PostProduct]}  request.body [product description]
 *
 * @return  {[PostProduct]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/', authenticateToken, checkAdminRole, validate(productSchemas.productSchema.post, 'body'), controllerHandler(productController.create.bind(productController)));

/**
 * POST /products/media
 * @summary Create a new media for a product
 * @tags Product
 * @security bearerAuth
 * @param   {[MediaUrl]}  request.body [media description]
 *
 * @return  {[MediaUrl]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/media', authenticateToken, checkAdminRole, multerMiddleware, handleUploadedFiles, validate(productSchemas.mediaSchema), controllerHandler(mediaController.create.bind(mediaController)));

/**
 * POST /products/media/order
 * @summary Create a new order for product media
 * @tags Product
 * @security bearerAuth
 * @param   {[ProductHasMedia]}  request.body- Array of ProductHasMedia objects
 * @param {array} request.body.productHasMedia - Array of ProductHasMedia objects
 *
 * @return  {[ProductHasMedia]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/media/order', authenticateToken, checkAdminRole, validate(productSchemas.productHasMediaSchema, 'body'), controllerHandler(productHasMediaController.create.bind(productHasMediaController)));

/**
 * POST /products/category
 * @summary Create a new category for a product
 * @tags ProductHasCategory
 * @security bearerAuth
 * @param   {[ProductHasCategory]}  request.body [product category description]
 *
 * @return  {[ProductHasCategory]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.post('/category', authenticateToken, checkAdminRole, validate(productSchemas.productHasCategorySchema.post, 'body'), controllerHandler(productHasCategoryController.create.bind(productHasCategoryController)));

/**
 * PATCH /products/{id}
 * @summary Update a product by ID
 * @tags Product
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @param   {[Product]}  request.body      [product description]
 *
 * @return  {[Product]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.patch('/:id', authenticateToken, checkAdminRole, validate(productSchemas.productSchema.patch, 'body'), controllerHandler(productController.update.bind(productController)));

/**
 * PATCH /products/{id}/categories
 * @summary Update product categories by ID
 * @tags Product
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @param   {[ProductHasCategory]}  request.body      [product category description]
 *
 * @return  {[ProductHasCategory]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.patch('/:id/categories', authenticateToken, checkAdminRole, validate(productSchemas.productHasCategorySchema.patch, 'body'), controllerHandler(productHasCategoryController.updateProductCategories.bind(productHasCategoryController)));

/**
 * PATCH /products/{id}/media
 * @summary Update product medias by ID
 * @tags Product
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @param   {[Media]}  request.body      [product media description]
 *
 * @return  {[Media, ProductHasMedia]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */
router.patch('/:id/media', authenticateToken, checkAdminRole, validate(productSchemas.productHasMediaSchema.patch, 'body'), controllerHandler(productHasMediaController.updateProductMedias.bind(productHasMediaController)));

/**
 * DELETE products/media/{id}
 * @summary Delete a media by ID
 * @tags Product
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @return  {[]} 200 - Success response - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
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
 * @return {object} 422 - Unprocessable entity - application/json
 * @example response - 422 - Example of unprocessable entity response
 * {
 * "message": "The request was well-formed but was unable to be followed due to semantic errors."
 * }
 */

router.delete('/media/:id', authenticateToken, checkAdminRole, validate(idSchemas.default.idUrl, 'query'), controllerHandler(mediaController.deleteOne.bind(mediaController)));

/**
 * DELETE products/{id}/category
 * @summary Delete a category by ID
 * @tags ProductHasCategory
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @return  {[]} 200 - Success response - application/json
 * @example response - 200 - Example of success response
 * {
  *"status": "success",
 * "data": null
 *}
 * @return {object} 500 - Internal server error - application/json
 * @example response - 500 - Example of internal server error response
 * {
 * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
 * }
 * @return {object} 401 - Unauthorized - application/json
 * @example response - 401 - Example of unauthorized response
 * {
 * "message": "You are not authorized to access the requested resource."
 * }
 * @return {object} 403 - Forbidden - application/json
 * @example response - 403 - Example of forbidden response
 * {
 * "message": "You are not allowed to access the requested resource."
 * }
 * @return {object} 404 - Not found - application/json
 * @example response - 404 - Example of not found response
 * {
 * "message": "The requested resource was not found on this server."
 * }
 */

router.delete('/:id/category', authenticateToken, checkAdminRole, controllerHandler(productHasCategoryController.deleteOne.bind(productHasCategoryController)));

/**
 * DELETE /products/{id}
 * @summary Delete a product by ID
 * @tags Product
 * @security bearerAuth
 * @param   {[number]} id.path          [id description]
 * @return  {[]} 200 - Success response - application/json
 * @example response - 200 - Example of success response
 * {
  *"status": "success",
    * "data": null
    * }
    * @return {object} 500 - Internal server error - application/json
    * @example response - 500 - Example of internal server error response
    * {
    * "message": "The server encountered an unexpected condition which prevented it from fulfilling the request."
    * }
    * @return {object} 401 - Unauthorized - application/json
    * @example response - 401 - Example of unauthorized response
    * {
    * "message": "You are not authorized to access the requested resource."
    * }
    * @return {object} 403 - Forbidden - application/json
    * @example response - 403 - Example of forbidden response
    * {
    * "message": "You are not allowed to access the requested resource."
    * }
    * @return {object} 404 - Not found - application/json
    * @example response - 404 - Example of not found response 
    * {
    * "message": "The requested resource was not found on this server."
    * }
*/
router.delete('/:id', authenticateToken, checkAdminRole, validate(idSchemas.default.idUrl, 'query'), controllerHandler(productController.deleteOne.bind(productController)));

export default router;
