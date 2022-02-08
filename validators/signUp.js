import Joi from 'joi';

const signUp = (obj) => {
    const registerParams = {
        firstName: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
        lastName: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
        mobileNumber: Joi.number().required(),
        emailId: Joi.string().email().required(),
        city: Joi.string().required(),
        password: Joi.string().required(),
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

export default signUp