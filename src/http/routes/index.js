import { Router } from "express";

import { attendancesRoutes } from "./attendances-routes.js";
import { authenticateRoutes } from "./authenticate-routes.js";
import { studentsRoutes } from "./students-routes.js";
import { usersRoutes } from "./users-routes.js";

const routes = Router();

// Register all routes
routes.use("/users", usersRoutes);
routes.use("/sessions", authenticateRoutes);
routes.use("/students", studentsRoutes);
routes.use("/attendances", attendancesRoutes);

// Health check endpoint
routes.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

export { routes };
