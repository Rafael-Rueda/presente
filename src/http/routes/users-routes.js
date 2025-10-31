import { Router } from "express";

import { UsersController } from "../controllers/users-controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const usersRoutes = Router();
const usersController = new UsersController();

// POST /users - Create a new user (public - for signup)
usersRoutes.post("/", (req, res, next) => usersController.create(req, res, next));

// Protected routes - require authentication
// GET /users - Get all users (protected)
usersRoutes.get("/", authenticate, (req, res, next) => usersController.getAll(req, res, next));

// GET /users/:id - Get a user by ID (protected)
usersRoutes.get("/:id", authenticate, (req, res, next) => usersController.getById(req, res, next));

// PATCH /users/:userId - Update user (protected)
usersRoutes.patch("/:userId", authenticate, (req, res, next) => usersController.update(req, res, next));

// DELETE /users/:userId - Delete user (protected)
usersRoutes.delete("/:userId", authenticate, (req, res, next) => usersController.delete(req, res, next));

export { usersRoutes };
