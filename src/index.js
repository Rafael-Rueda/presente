import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger.js";
import { errorHandler } from "./http/middlewares/error-handler.js";
import { routes } from "./http/routes/index.js";
import sequelize from "../sequelize/sequelize.js";
// Import models to ensure they are registered with Sequelize
import "./models/users.js";
import "./models/students.js";
import "./models/attendances.js";

dotenv.config({ path: "../.env" });

const app = express();

// CORS configuration
app.use(
    cors({
        origin: "*", // Permite todas as origens. Para produção, especifique o domínio: ['https://seudominio.com']
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes
app.use("/", routes);

// Global error handling middleware (must be after routes)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

// Initialize database and start server
const PORT = process.env.PORT;

async function startServer() {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log("✓ Database connection established successfully");

        // Sync models (creates tables if they don't exist)
        // TEMPORARY: Using force to recreate tables with correct schema
        await sequelize.sync({ alter: true });
        console.log("✓ Database models synchronized");

        // Start server
        app.listen(PORT, () => {
            console.log(`✓ Server is running on http://localhost:${PORT}`);
            console.log(`✓ API available at http://localhost:${PORT}`);
            console.log(`✓ Health check at http://localhost:${PORT}/health`);
            console.log(`✓ API Documentation at http://localhost:${PORT}/docs`);
        });
    } catch (error) {
        console.error("✗ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
