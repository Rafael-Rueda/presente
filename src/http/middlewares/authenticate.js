import jwt from "jsonwebtoken";

import AppError from "../../errors/app-error.js";

export function authenticate(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Missing authorization token", 401);
        }

        // Token format: "Bearer <token>"
        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            throw new AppError("Token error: invalid format", 401);
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            throw new AppError("Token error: invalid scheme", 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        return next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid token", 401));
        }

        if (error.name === "TokenExpiredError") {
            return next(new AppError("Token expired", 401));
        }

        return next(error);
    }
}
