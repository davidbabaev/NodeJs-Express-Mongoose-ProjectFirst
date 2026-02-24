const Joi = require('joi');

const joiSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).max(1024).required(),
    web: Joi.string().uri().min(3).max(1024),
    category: Joi.string().allow('').max(256),
    image: Joi.string().uri().min(3).max(1024).required(),
    location: Joi.string().min(3).max(1024),
}).unknown(false).required()

module.exports = joiSchema;