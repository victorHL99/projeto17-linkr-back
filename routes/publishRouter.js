import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

import publishSchema from "../schemas/publishSchema.js";

import { createPublish } from "../controllers/publishController.js";

const publishRouter = Router();

publishRouter.post("/publish", validateSchema(publishSchema), tokenValidation, createPublish);

export default publishRouter;
