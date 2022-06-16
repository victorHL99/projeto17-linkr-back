import { Router } from "express";
import { likesValidation } from "../middlewares/likesMiddleware.js";
import { addLike } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post("/likes",likesValidation, addLike);

export default likesRouter;