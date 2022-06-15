import { Router } from "express"

import { postSignin, postUser } from "../controllers/authController.js"
import {
  signinMiddleware,
  signupMiddleware,
} from "../middlewares/authMiddleware.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { signinSchema, signupSchema } from "../schemas/authSchema.js"

const authRouter = Router()
authRouter.post(
  "/signup",
  validateSchema(signupSchema),
  signupMiddleware,
  postUser,
)
authRouter.post(
  "/signin",
  validateSchema(signinSchema),
  signinMiddleware,
  postSignin,
)

export default authRouter
