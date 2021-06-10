import Joi from "joi"

export default Joi.object({
    name: Joi.string()
            .max(64)
            .min(3)
            .error(new Error('Name is invalid')),
    phone: Joi.string()
            .pattern(/^9989[012345789][0-9]{7}$/,)
            .required()
            .error(new Error('Phone number is invalid')),
    bdate: Joi.date()
              .required()
              .error(new Error('Birth date is invalid')),
    gender: Joi.number()
               .min(1)
                .max(2)
               .required()
               .error(new Error('Gender is invalid')),
    email: Joi.string().email().required().error(Error('Gmail is invalid')),
    password: Joi.string().required().error(Error("Password is incorrect!"))
    
})