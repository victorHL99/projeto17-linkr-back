import { Router } from "express"

import { getPosts } from "../controllers/postsController.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)

export default postsRouter
