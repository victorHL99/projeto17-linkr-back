import { Router } from "express"

import {
  getPosts,
  createPost,
  deletePost,
  getPostsByHashtag,
  updatePost,
} from "../controllers/postsController.js"

import { userPostMiddleware } from "../middlewares/postsMiddleware.js"

import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import newPostSchema from "../schemas/newPostSchema.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag)
postsRouter.get("/posts/:userId", getPosts)
postsRouter.post(
  "/posts",
  validateSchema(newPostSchema),
  tokenValidation,
  createPost,
)
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
