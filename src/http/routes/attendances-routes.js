import { Router } from "express";

import { AttendancesController } from "../controllers/attendances-controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const attendancesRoutes = Router();
const attendancesController = new AttendancesController();

// Protected routes - require authentication
// POST /attendances/validate - Validate attendance for a student
attendancesRoutes.post("/validate", authenticate, (req, res, next) => attendancesController.validate(req, res, next));

// GET /attendances - Get all attendances
attendancesRoutes.get("/", authenticate, (req, res, next) => attendancesController.getAll(req, res, next));

// GET /attendances/student/:studentId - Get all attendances for a specific student
attendancesRoutes.get("/student/:studentId", authenticate, (req, res, next) =>
    attendancesController.getByStudent(req, res, next),
);

export { attendancesRoutes };
