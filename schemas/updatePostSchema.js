import Joi from "joi"

const newPostSchema = Joi.object({
 
  message: Joi.any(),
})

export default newPostSchema
