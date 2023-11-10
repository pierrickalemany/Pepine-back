/**
 * controllerHandler module.
 * @module controllerHandler
 */

import Debug from 'debug';

const debug = Debug('oblog:controllers:handler');

/**
 * Factory returning a controller with error handling
 *
 * @param {function} controller - a middleware controller
 * @returns {function} a middleware controller with error management
 */
/**
 * Wraps a controller function with error handling middleware.
 * @param {Function} controller - The controller function to wrap.
 * @returns {Function} - The wrapped controller function.
 */
function controllerHandler(controller) {
  debug(`create new controller with error handling for ${controller.name}`);
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (err) {
      next(err);
    }
  };
}

export default controllerHandler;
