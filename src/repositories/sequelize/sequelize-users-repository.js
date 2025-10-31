import { User } from "../../models/users.js";

export class SequelizeUsersRepository {
    async create(user) {
        const userCreated = await User.create({
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
        });

        return userCreated;
    }

    async findByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    async findById(id) {
        const user = await User.findByPk(id);
        return user;
    }

    async findAll() {
        const users = await User.findAll();
        return users;
    }

    async update(userId, name, email, passwordHash) {
        const [affectedCount, [updatedUser]] = await User.update(
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(passwordHash && { passwordHash }),
            },
            { where: { id: userId }, returning: true },
        );

        return updatedUser ?? null;
    }

    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) return null;

        await user.destroy();

        return user;
    }
}
