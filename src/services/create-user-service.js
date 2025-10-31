import { hash } from "bcryptjs";

import UserAlreadyExistsError from "../errors/user-already-exists-error.js";

export class CreateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(name, email, password) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await hash(password, 6);

        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash,
        });
        return user;
    }
}
