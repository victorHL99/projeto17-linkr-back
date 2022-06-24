import { Router } from "express"

import {
  getUser,
  getUserByUsername,
  getFollowCount,
} from "../controllers/userController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const userRouter = Router()

userRouter.get("/user", getUserByUsername)
userRouter.get("/user/:userId", getUser)
userRouter.get("/follows", tokenValidation, getFollowCount)

export default userRouter
