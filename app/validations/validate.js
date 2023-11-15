import Debug from 'debug';
import BadInputError from '../errors/BadInputError.js';
/*
* validate module.
* @module validate
*/
const debug = Debug('pepine:validatation');

/**
 * Factory returning a validation middleware
*
* @param {Object} schema - a Joi schema
* @param {('query'|'body'|'params')} dataSource - the source object
* @returns {function} a validation middleware
*/
function validate(schema, dataSource) {
  debug('create a new validation middleware');
  return async (request, response, next) => {
    console.log('validate', request.body);
    try {
      // debug(schema.constructor.name);
      await schema.validateAsync(request[dataSource]);
      next();
    } catch (err) {
      next(new BadInputError(err));
    }
  };
}

export default validate;
