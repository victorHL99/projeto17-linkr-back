import Joi from "joi"

const newPostSchema = Joi.object({
  sharedUrl: Joi.any(),
  message: Joi.any()
})

export default newPostSchema
