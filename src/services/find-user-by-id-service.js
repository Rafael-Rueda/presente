import UserNotFoundError from "../errors/user-not-found-error.js";

export class FindUserByIdService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(id) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }
}
