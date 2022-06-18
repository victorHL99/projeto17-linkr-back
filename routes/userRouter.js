import { Router } from "express"

import { getUser } from "../controllers/userController.js"

const userRouter = Router()

userRouter.get("/user/:userId", getUser)

export default userRouter
