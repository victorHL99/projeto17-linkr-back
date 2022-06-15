import { Router } from "express";

import { postUser } from "../controllers/authController.js";
import { signupMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { signupSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.post(
  "/signup",
  validateSchema(signupSchema),
  signupMiddleware,
  postUser
);

export default authRouter;
