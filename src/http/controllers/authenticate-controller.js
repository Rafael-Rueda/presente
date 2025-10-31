import jwt from "jsonwebtoken";

import AppError from "../../errors/app-error.js";
import { SequelizeUsersRepository } from "../../repositories/sequelize/sequelize-users-repository.js";
import { AuthenticateService } from "../../services/authenticate-service.js";

export class AuthenticateController {
    async create(req, res, next) {
        try {
            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                throw new AppError("Missing required fields: email and password are required", 400);
            }

            const usersRepository = new SequelizeUsersRepository();
            const authenticateService = new AuthenticateService(usersRepository);

            const user = await authenticateService.execute(email, password);

            const payload = {
                id: user.id,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "15m", // expira em 15 minutos
            });

            // Don't return the password hash
            const { passwordHash, ...userWithoutPassword } = user.toJSON();

            return res.status(200).json({
                token,
                user: userWithoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id;
            const userEmail = req.user.email;

            return res.status(200).json({
                message: "Logged out successfully",
                user: {
                    id: userId,
                    email: userEmail,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
