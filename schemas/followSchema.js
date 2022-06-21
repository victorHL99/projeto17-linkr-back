import Joi from "joi"

const followSchema = Joi.object({
  userId: Joi.string().required(),
  followedId: Joi.string().required(),
})

export default followSchema
