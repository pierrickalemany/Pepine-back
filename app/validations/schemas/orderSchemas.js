import Joi from 'joi';

const orderSchema = {
  post: Joi.object({
    first_name_order: Joi.string().min(2).max(50).required(),
    last_name_order: Joi.string().min(2).max(50).required(),
    total_price: Joi.number().precision(2).positive(),
    status: Joi.string().max(50),
    user_id: Joi.number().integer().positive(),
  }),
  patch: Joi.object({
    // reference"
    first_name_order: Joi.string().min(2).max(50),
    last_name_order: Joi.string().min(2).max(50),
    total_price: Joi.number().precision(2),
    status: Joi.string().max(50),
    user_id: Joi.number().integer().positive(),
  }).min(1),
};

const orderHasProductSchema = Joi.array().items(Joi.object({
  product_id: Joi.number().integer().positive(),
  order_id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive(),
  price_time_order: Joi.number().precision(2).positive(),
  vat: Joi.number().precision(2).positive(),
}));

export {
  orderSchema,
  orderHasProductSchema,
};
