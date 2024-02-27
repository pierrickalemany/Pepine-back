/* eslint-disable max-len */
import { Router } from 'express';
import categoryController from '../controllers/api/category.js';
import productHasCategory from '../controllers/api/productHasCategory.js';
import controllerHandler from '../controllers/helpers/controllerHandler.js';
import validate from '../validations/validate.js';
import checkAdminRole from '../middleware/checkAdminRole.js';
import authenticateToken from '../middleware/authenticateToken.js';
import * as idSchemas from '../validations/schemas/idSchemas.js';

const router = Router();
/**
 * @typedef {object} Category
 * @property {string} name.required - Name of the category - ex: Aromatiques
 * @property {string} description.required - Description of the category - ex: Aromatiques
 */

/**
 * @typedef {object} CategoryByProduct
 * @param {integer} id.required - ID of the product_id - ex: 1
 */

/**
 * @typedef {object} CategoryProduct
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
 * GET /categories/
 * @summary Get all categories
 * @tags category
 * @return {Category} 200 - User created - application/json
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
router.get('/', controllerHandler(categoryController.getAll.bind(categoryController)));

/**
 * GET /categories/{id}
 * @summary Get one category
 * @tags category
 * @param {number} id.path.required - id of the category to get
 * @return {Category} 200 - User created - application/json
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

router.get('/:id', validate(idSchemas.default.idUrl, 'query'), controllerHandler(categoryController.getOne.bind(categoryController)));

/**
 * Get /categories/{id}/products
 * @summary Get all products of one category
 * @tags category
 * @param {number} id.path.required - id of the category to get
 * @return {[CategoryProduct]} 200 - User created - application/json
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

router.get('/:id/products', validate(idSchemas.default.idUrl, 'query'), controllerHandler(categoryController.getAllProductsOfCategory.bind(categoryController)));

/**
 * DELETE /categories/product/{id}
 * @summary Delete a category by product id
 * @tags categoryByProduct
 * @param {number} id.path.required - id of the product_id to delete
 * @return {CategoryByProduct} 200 - delete success - application/json
 * @return {object} 500 - Internal server error - application/json

 */
router.delete('/product/:id', validate(idSchemas.default.idUrl, 'params'), authenticateToken, checkAdminRole, controllerHandler(productHasCategory.deleteCategoryByProductId.bind(productHasCategory)));

export default router;
