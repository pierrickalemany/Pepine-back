import Joi from 'joi';

// Email Regex detail:
// Accepts various characters except special symbols in the local part
// Allows domains separated by periods in the local part
// Allows an entire string enclosed in double quotes
// Allows an opening square bracket for an IP address
// Accepts an IP address in the format x.x.x.x
// Allows a domain composed of letters, numbers, and hyphens, followed by a period
// Accepts a top-level domain (TLD) composed of letters (at least two characters)
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Pawword Regex detail:
// Made up of a minimum of 8 characters. Adjust it by modifying {8,}
// At least one capital letter. You can remove this condition by deleting (?=.* ?[A-Z])
// At least one lowercase letter. You can remove this condition by deleting (?=.* ?[a-z])
// At least one number. You can remove this condition by deleting (?=.* ?[0-9])
// At least one special character, You can remove this condition by removing (?=.* ?[#?!@$%^&*-])
const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const userSchema = {
  post: Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    email: Joi.string().pattern(emailPattern).min(8).max(50)
      .required(),
    password: Joi.string().pattern(passwordPattern).required(),
  }).required(),
  patch: Joi.object({
    first_name: Joi.string().min(2).max(50),
    last_name: Joi.string().min(2).max(50),
    phone: Joi.string().min(8).max(20),
    email: Joi.string().pattern(emailPattern).min(8).max(50)
      .required(),
    password: Joi.string().pattern(passwordPattern),
  }).min(2),
};

const changePasswordSchema = {
  post: Joi.object({
    oldPassword: Joi.string().pattern(passwordPattern).required(),
    newPassword: Joi.string().pattern(passwordPattern).required(),
  }).required(),
};

const registerSchema = {
  post: Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    email: Joi.string().pattern(emailPattern).min(8).max(50)
      .required(),
    password: Joi.string().pattern(passwordPattern).required(),
    role: Joi.string().valid('admin', 'user'),
  }),
};

const loginSchema = {
  post: Joi.object({
    email: Joi.string().pattern(emailPattern).min(8).max(50)
      .required(),
    password: Joi.string().pattern(passwordPattern).required(),
  }).required(),
};

const resetPasswordSchema = {
  post: Joi.object({
    newPassword: Joi.string().pattern(passwordPattern).required(),
    resetToken: Joi.string().min(1).required(),
  }),
};

const forgotPasswordSchema = {
  post: Joi.object({
    email: Joi.string().pattern(emailPattern).min(8).max(50)
      .required(),
  }),
};

export {
  userSchema,
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
  changePasswordSchema,
};
