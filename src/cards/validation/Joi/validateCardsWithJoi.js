const Joi = require('joi');

const validateCard = (card) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        content: Joi.string().min(2).max(1024).required(),
        category: Joi.string().min(2).max(256),
        web: Joi.string().uri(),
        image: Joi.object({
            url: Joi.string().uri(),
            alt: Joi.string().min().max(),
        }),
        location: Joi.string().max(256),
    });

    return schema.validate(card);
};

module.exports = validateCard;