const Joi = require('joi');

const validateUser = (user) => {
    const validated = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        email: Joi.string().regex(RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)).required(),
        password: Joi.string().regex(RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)).required(),
        phone: Joi.string().regex(RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).required(),
        address: Joi.object({
            country: Joi.string(),
            city: Joi.string().min(2).max(20),
            street: Joi.string().min(2).max(20),
            house: Joi.number().integer().min(1).max(10000),
            zip: Joi.number().integer().min(1).max(10000),
        }).required()
    })

    return validated.validate(user)
}

module.exports = validateUser;