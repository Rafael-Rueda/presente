import UserNotFoundError from "../errors/user-not-found-error.js";

export class DeleteUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(id) {
        const userDeleted = await this.usersRepository.delete(id);

        if (userDeleted === null) {
            throw new UserNotFoundError();
        }

        return userDeleted;
    }
}
