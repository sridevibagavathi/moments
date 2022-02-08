import Joi from 'joi';

const addValidator = (obj) => {
    const registerParams = {
        title: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]+$')).required(),
        tags: Joi.string().pattern(new RegExp('[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*')).required(),
        userId: Joi.number().required(),
        createdBy: Joi.string().email().required(),
        image: Joi.optional()
    }
    const result = schemaValidation(registerParams, obj)
    if (result.hasOwnProperty('error')) {
        return { success: false, error: result.error.details[0].message.split(':')[0].replace(/\"/g, '') }
    } else {
        return { success: true }
    }
}

const updateValidator = (obj) => {
    const registerParams = {
        title: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]+$')).optional(),
        tags: Joi.string().pattern(new RegExp('[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*')).optional(),
        userId: Joi.number().required(),
        updatedBy: Joi.string().email().required(),
        image: Joi.optional()
    }
    const result = schemaValidation(registerParams, obj)
    if (result.hasOwnProperty('error')) {
        return { success: false, error: result.error.details[0].message.split(':')[0].replace(/\"/g, '') }
    } else {
        return { success: true }
    }
}

const schemaValidation = (apiParams, joiObj) => {
    const schema = Joi.object(apiParams)
    const result = schema.validate(joiObj);
    return result;
}

export {
    addValidator,
    updateValidator
}