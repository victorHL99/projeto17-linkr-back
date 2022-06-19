import { Router } from "express"

import { getPosts, createPost } from "../controllers/postsController.js"

import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

import newPostSchema from "../schemas/newPostSchema.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/posts/:userId", getPosts)
postsRouter.post(
  "/posts",
  validateSchema(newPostSchema),
  tokenValidation,
  createPost,
)

export default postsRouter
