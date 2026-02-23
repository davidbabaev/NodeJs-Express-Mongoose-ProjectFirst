const Joi = require('joi');

const imageUrlRegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const validateUser = (user) => {
    const validated = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        email: Joi.string().regex(RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)).required(),
        password: Joi.string().regex(RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)).required(),
        phone: Joi.string().regex(RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).required(),
        profilePicture: Joi.string().uri().regex(RegExp(imageUrlRegExp)),
        coverImage: Joi.string().uri().regex(RegExp(imageUrlRegExp)),
        age: Joi.number().integer().min(5).max(120).required(),
        job: Joi.string().min(2).max(50),
        gender: Joi.string().min(2).max(10),
        birthDate: Joi.date().required(),
        aboutMe: Joi.string().min(2).max(1024),
        address: Joi.object({
            country: Joi.string(),
            city: Joi.string().min(2).max(20),
            street: Joi.string().min(2).max(20),
            house: Joi.number().integer().min(1).max(10000),
            zip: Joi.number().integer().min(1).max(100000),
        }).required()
    }).unknown(false).required();

    return validated.validate(user)
}

module.exports = validateUser;
