const Joi = require('joi')
const authSchema = Joi.object({
    name:Joi.string().required().min(3).max(30),
    email:Joi.string().email().lowercase(),
    password:Joi.string().required()
})


module.exports={
    authSchema
}