import { Router } from "express"

import {
  getPosts,
  getPostsFromUserById,
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

postsRouter.get("/posts", tokenValidation, getPosts)
postsRouter.get("/posts/:userId", tokenValidation, getPostsFromUserById)
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag)
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
  /* validateSchema(newPostSchema), */
  updatePost,
)

export default postsRouter
