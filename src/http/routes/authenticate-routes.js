import { Router } from "express";

import { AuthenticateController } from "../controllers/authenticate-controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const authenticateRoutes = Router();
const authenticateController = new AuthenticateController();

// POST /sessions - Login (public)
authenticateRoutes.post("/", (req, res, next) => authenticateController.create(req, res, next));

// DELETE /sessions - Logout (protected)
authenticateRoutes.delete("/", authenticate, (req, res, next) => authenticateController.delete(req, res, next));

export { authenticateRoutes };
