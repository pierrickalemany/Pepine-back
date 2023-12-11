import Joi from 'joi';

// Url Regex detail:
// "http" or "https". The URL must start with one of these protocols.
// (jpg|jpeg|png|gif|bmp|svg): This matches one of the specified image file extensions.
// The URL must end with one of these extensions.
// const urlRegex = /^(http|https):\/\/[^ "']+\\.(jpg|jpeg|png|gif|bmp|svg)$/;

const productSchema = {
  post: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    scientific_name: Joi.string().min(2).max(100).required(),
    maturity_height: Joi.string().max(50),
    maturity_width: Joi.string().max(50),
    family: Joi.string().max(50),
    origin: Joi.string().max(50),
    flower_color: Joi.string().max(50),
    leaf_color: Joi.string().max(50),
    description1: Joi.string(),
    description2: Joi.string(),
    size: Joi.string().max(50),
    pot: Joi.string().max(50),
    stock: Joi.number().integer().positive().allow(0),
    price: Joi.number().precision(2).positive(),
    vat: Joi.number().precision(2).positive(),
    status: Joi.boolean(),
    user_id: Joi.number().integer().positive(),
    yield_id: Joi.number().integer().positive(),
    hardiness_zone_id: Joi.number().integer().positive(),
    water_requirement_id: Joi.number().integer().positive(),
    exposure_id: Joi.number().integer().positive(),
    ground_cover_power_id: Joi.number().integer().positive(),
    strate_id: Joi.number().integer().positive(),
    foliage_id: Joi.number().integer().positive(),
  }),
  patch: Joi.object({
    name: Joi.string().min(2).max(50),
    scientific_name: Joi.string().min(2),
    maturity_height: Joi.string().max(50),
    maturity_width: Joi.string().max(50),
    family: Joi.string().max(50),
    origin: Joi.string().max(50),
    flower_color: Joi.string().max(50),
    leaf_color: Joi.string().max(50),
    description1: Joi.string(),
    description2: Joi.string(),
    size: Joi.string().max(50),
    pot: Joi.string().max(50),
    stock: Joi.number().integer().positive().allow(0),
    price: Joi.number().precision(2).positive(),
    vat: Joi.number().precision(2).positive(),
    status: Joi.boolean(),
    user_id: Joi.number().integer().positive(),
    yield_id: Joi.number().integer().positive(),
    hardiness_zone_id: Joi.number().integer().positive(),
    water_requirement_id: Joi.number().integer().positive(),
    exposure_id: Joi.number().integer().positive(),
    ground_cover_power_id: Joi.number().integer().positive(),
    strate_id: Joi.number().integer().positive(),
    foliage_id: Joi.number().integer().positive(),
  }).min(1),
};

const mediaSchema = Joi.array().items(Joi.object({
  url: Joi.string().required(),
  name: Joi.string().max(50).required(),
}));

const productHasCategorySchema = {
  post: Joi.object({
    product_id: Joi.number().integer().positive().required(),
    category_id: Joi.number().integer().positive().required(),
  }).required(),
  patch: Joi.object({
    product_id: Joi.number().integer().positive(),
    category_id: Joi.number().integer().positive(),
  }),
};

const productHasMediaSchema = Joi.array().items(Joi.object({
  product_id: Joi.number().integer().positive().required(),
  media_id: Joi.number().integer().positive().required(),
  order: Joi.number().integer().positive().required(),
}));

export {
  productSchema,
  mediaSchema,
  productHasCategorySchema,
  productHasMediaSchema,
};
