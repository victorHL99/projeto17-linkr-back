import Joi from "joi"

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,}$")),
  username: Joi.string().required(),
  profileImage: Joi.string().required().uri(),
})

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,}$")),
})
