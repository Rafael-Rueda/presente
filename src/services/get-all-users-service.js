export class GetAllUsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute() {
        const users = await this.usersRepository.findAll();
        return users;
    }
}
