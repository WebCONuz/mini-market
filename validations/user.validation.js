const Joi = require("joi");

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).message("Min 6ta").required(),
});

module.exports = userSchema;
