/**
 * Controller for handling API requests
 * @namespace apiController
 */
const apiController = {
  /**
   * Responds with the URL for the API documentation
   *
   * @function getHome
   * @memberof apiController
   * @param {Object} request - The HTTP request object
   * @param {Object} response - The HTTP response object
   */
  getHome(request, response) {
    /**
     * The full URL for the API documentation
     * @type {string}
     */
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs'}`;
    response.redirect(fullURL);
  },
};

export default apiController;
