import Joi from 'joi';

const publishSchema = joi.object({
    shared_url: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    message: Joi.string()
})

export default publishSchema;