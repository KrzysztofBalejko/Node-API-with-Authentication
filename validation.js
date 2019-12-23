const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
                 .min(6)
                 .required(),
        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
        password: Joi.string()
                     .min(6)
                     .required()
    }
    return Joi.ValidationError(data, schema);
}

// Login validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
        password: Joi.string()
                     .min(6)
                     .required()
    }
    return Joi.ValidationError(data, schema);
}

module.exports.registerValdiation = registerValidation;


