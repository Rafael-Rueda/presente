import { Student } from "../../models/students.js";

export class SequelizeStudentsRepository {
    async create(student) {
        const studentCreated = await Student.create({
            name: student.name,
            email: student.email,
        });

        return studentCreated;
    }

    async findByEmail(email) {
        const student = await Student.findOne({ where: { email } });
        return student;
    }

    async findById(id) {
        const student = await Student.findByPk(id);
        return student;
    }

    async findAll() {
        const students = await Student.findAll();
        return students;
    }

    async update(studentId, name, email) {
        const [affectedCount, [updatedStudent]] = await Student.update(
            {
                ...(name && { name }),
                ...(email && { email }),
            },
            { where: { id: studentId }, returning: true },
        );

        return updatedStudent ?? null;
    }

    async delete(id) {
        const student = await Student.findByPk(id);
        if (!student) return null;

        await student.destroy();

        return student;
    }
}
