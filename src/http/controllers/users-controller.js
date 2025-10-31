import AppError from "../../errors/app-error.js";
import { SequelizeUsersRepository } from "../../repositories/sequelize/sequelize-users-repository.js";
import { CreateUserService } from "../../services/create-user-service.js";
import { DeleteUserService } from "../../services/delete-user-service.js";
import { FindUserByIdService } from "../../services/find-user-by-id-service.js";
import { GetAllUsersService } from "../../services/get-all-users-service.js";
import { UpdateUserService } from "../../services/update-user-service.js";

export class UsersController {
    async create(req, res, next) {
        try {
            const { name, email, password } = req.body;

            // Validate required fields
            if (!name || !email || !password) {
                throw new AppError("Missing required fields: name, email, and password are required", 400);
            }

            const usersRepository = new SequelizeUsersRepository();
            const createUserService = new CreateUserService(usersRepository);

            const user = await createUserService.execute(name, email, password);

            // Don't return the password hash
            const { passwordHash, ...userWithoutPassword } = user.toJSON();

            return res.status(201).json({
                user: userWithoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const usersRepository = new SequelizeUsersRepository();
            const findUserByIdService = new FindUserByIdService(usersRepository);

            const user = await findUserByIdService.execute(id);

            const { passwordHash, ...userWithoutPassword } = user.toJSON();

            return res.status(200).json({
                user: userWithoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const usersRepository = new SequelizeUsersRepository();
            const getAllUsersService = new GetAllUsersService(usersRepository);

            const users = await getAllUsersService.execute();

            const usersWithoutPassword = users.map((user) => {
                const { passwordHash, ...userWithoutPassword } = user.toJSON();
                return userWithoutPassword;
            });

            return res.status(200).json({
                users: usersWithoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const { name, email, password } = req.body;

            const usersRepository = new SequelizeUsersRepository();
            const updateUserService = new UpdateUserService(usersRepository);

            const updatedUser = await updateUserService.execute(userId, name, email, password);

            const { passwordHash, ...userWithoutPassword } = updatedUser.toJSON();

            return res.status(200).json({
                user: userWithoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { userId } = req.params;

            const usersRepository = new SequelizeUsersRepository();
            const deleteUserService = new DeleteUserService(usersRepository);

            const deletedUser = await deleteUserService.execute(userId);

            const { passwordHash, ...userWithoutPassword } = deletedUser.toJSON();

            return res.status(200).json({
                user: userWithoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }
}
