import { Router } from "express"

import { getPosts } from "../controllers/postsController.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/posts/:userId", getPosts)

export default postsRouter
