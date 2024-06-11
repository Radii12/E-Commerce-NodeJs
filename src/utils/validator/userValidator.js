const Joi =require ("joi")

exports.loginSchema=Joi.object({
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
})
exports.signUpSchema=Joi.object({
    name:Joi.string().alphanum().min(3).max(9).required(),
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net','pro']}}).required(),
    address:Joi.array(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
    Cpassword:Joi.ref('password')
})


exports.loginSchema=Joi.object({
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net','pro']}}).required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required()
})
