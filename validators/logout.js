import Joi from 'joi';

const logout = (obj) => {
    const registerParams = {
        emailId: Joi.string().email().required(),
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

export default logout