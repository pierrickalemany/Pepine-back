/* import media from './media.js';
import product from './product.js';
import user from './user.js';
import order from './order.js';
import orderHasProduct from './orderHasProduct.js';
import productHasCategory from './productHasCategory.js';
import productHasMedia from './productHasMedia.js';
*/

const apiController = {
  /**
   * responds with api documentation url
   *
   * @param {Object} request
   * @param {Object} response
   */
  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs'}`;
    response.redirect(fullURL);
  },
};

export default apiController;
