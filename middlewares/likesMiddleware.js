import joi from "joi"

export async function likesValidation(req, res, next) {
    console.log(req.body)
    const newLike = req.body;
    const likeSchema = joi.object({
        post_id: joi.string().min(1).required()
    });
    const validation = likeSchema.validate(newLike);

  if (validation.error) {
    res.status(400).send(validation.error.details)
    return
  }
  next()
}
