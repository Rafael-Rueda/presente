import { Router } from "express";

import { StudentsController } from "../controllers/students-controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const studentsRoutes = Router();
const studentsController = new StudentsController();

// Protected routes - require authentication
// POST /students - Create a new student
studentsRoutes.post("/", authenticate, (req, res, next) => studentsController.create(req, res, next));

// GET /students - Get all students
studentsRoutes.get("/", authenticate, (req, res, next) => studentsController.getAll(req, res, next));

// GET /students/:id - Get a student by ID
studentsRoutes.get("/:id", authenticate, (req, res, next) => studentsController.getById(req, res, next));

export { studentsRoutes };
