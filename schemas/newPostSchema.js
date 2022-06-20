import Joi from "joi"

const newPostSchema = Joi.object({
  sharedUrl: Joi.string()
    .required()
    .pattern(/^(http|https):\/\/[^ "]+$/),
  message: Joi.string(),
})

export default newPostSchema
