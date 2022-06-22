import { Router } from "express"

import { listComments } from "../controllers/commentsController.js"

const commentsRouter = Router()

commentsRouter.get("/comments/:postId", listComments)

export default commentsRouter