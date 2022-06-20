import { Router } from "express"

import {
  deletePost,
  getPosts,
  getPostsByHashtag,
  updatePost,
} from "../controllers/postsController.js"
import { userPostMiddleware } from "../middlewares/postsMiddleware.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import newPostSchema from "../schemas/newPostSchema.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag)
postsRouter.get("/posts/:userId", getPosts)
postsRouter.delete(
  "/posts/:id",
  tokenValidation,
  userPostMiddleware,
  deletePost,
)
postsRouter.put(
  "/posts/:id",
  tokenValidation,
  validateSchema(newPostSchema),
  updatePost,
)

export default postsRouter
