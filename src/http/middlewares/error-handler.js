import AppError from "../../errors/app-error.js";

export function errorHandler(err, req, res, next) {
    // Log error for debugging (you can use a proper logger in production)
    console.error("Error:", {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });

    // Check if it's an operational error (AppError)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }

    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
            error: "Validation error",
            details: err.errors?.map((e) => e.message) || err.message,
        });
    }

    // Handle Sequelize database errors
    if (err.name === "SequelizeDatabaseError") {
        return res.status(400).json({
            error: "Database error",
        });
    }

    // Default to 500 server error for unknown errors
    return res.status(500).json({
        error: "Internal server error",
    });
}
