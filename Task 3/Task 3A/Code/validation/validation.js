const Joi = require('@hapi/joi')

const registerValidationn = (data) =>{
    const schema = Joi.object({
        fullname: Joi.string() .min(5) .required(),
        email: Joi.string() .min(5) .required() .email(),
        password: Joi.string() .min(5) .required(),
        datOfJoining:Joi.date(),
        designation:Joi.string().required(),
        reportingmanager: Joi.string().required(),
        Hr:Joi.string().required(),
        teamLead:Joi.string().required(),
        officeLocation:Joi.string().required()
    })
    return schema.validate(data)
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string() .min(5) .required() .email(),
        password: Joi.string() .min(5) .required(),
    })
    return schema.validate(data)
}

module.exports.registerValidationn = registerValidationn
module.exports.loginValidation = loginValidation