import Joi from "joi"

const newPostSchema = Joi.object({
  sharedUrl: Joi.string().required().uri(),
  message: Joi.any(),
})

export default newPostSchema
