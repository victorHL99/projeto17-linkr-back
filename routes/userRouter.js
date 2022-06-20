import { Router } from "express"

import { getUser, getUserByUsername } from "../controllers/userController.js"

const userRouter = Router()

userRouter.get("/user", getUserByUsername)
userRouter.get("/user/:userId", getUser)

export default userRouter
