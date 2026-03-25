const Joi = require('joi');

const joiSchema = Joi.object({
    title: Joi.string().min(3).max(256).required(),
    content: Joi.string().min(3).max(1024).required(),
    web: Joi.string().uri().min(3).max(1024),
    category: Joi.string().allow('').max(256),
    image: Joi.string().uri().optional(),
    location: Joi.string().min(3).max(1024),
});

module.exports = joiSchema;