import { compare } from "bcryptjs";

import InvalidCredentialsError from "../errors/invalid-credentials-error.js";

export class AuthenticateService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(email, password) {
        const user = await this.usersRepository.findByEmail(email);

        // Check if user exists
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const passwordsMatch = await compare(password, user.passwordHash);

        if (!passwordsMatch) {
            throw new InvalidCredentialsError();
        }

        return user;
    }
}
