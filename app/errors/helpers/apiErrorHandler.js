/**
 * apiErrorHandler module.
 * @module apiErrorHandler
 */

import Debug from 'debug';
import InternalServerError from '../InternalServerError.js';

const debug = Debug('pepine:apiErrorHandler');

/**
 * express error middleware for json api
 *
 * @param {Error} error - an error
 * @param {Object} request - http request object
 * @param {Object} response - http response object
 * @param {function} _next - go to next mw function
 */

function apiErrorHandler(error, request, response) {
  debug(error);
  // logger.error(error);
  if (!error.httpStatusCode) {
    // eslint-disable-next-line no-param-reassign
    error = new InternalServerError(error);
  }
  response.status(error.httpStatusCode);
  if (process.env.NODE_ENV === 'production') {
    return response.json({ status: 'error', message: error.message });
  }

  return response.json({
    status: 'error',
    message: error.message,
    detail: error?.detail,
    stack: error?.stack,
  });
}

export default apiErrorHandler;
