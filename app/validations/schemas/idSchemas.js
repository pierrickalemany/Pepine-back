import Joi from 'joi';

const idSchema = {
  idUrl: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

export default idSchema;
