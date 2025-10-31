import { hash } from "bcryptjs";

import UserNotFoundError from "../errors/user-not-found-error.js";

export class UpdateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(userId, name, email, password) {
        let passwordHash;

        if (password) {
            passwordHash = await hash(password, 6);
        }

        if (!userId) {
            throw new UserNotFoundError();
        }

        const updatedUser = await this.usersRepository.update(userId, name, email, passwordHash);

        if (updatedUser === null) {
            throw new UserNotFoundError();
        }

        return updatedUser;
    }
}
