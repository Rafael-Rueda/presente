import { Op } from "sequelize";

import { Attendance } from "../../models/attendances.js";
import { Student } from "../../models/students.js";

export class SequelizeAttendancesRepository {
    async create(attendance) {
        const attendanceCreated = await Attendance.create({
            studentId: attendance.studentId,
            date: attendance.date,
        });

        return attendanceCreated;
    }

    async findByStudentAndDate(studentId, date) {
        const attendance = await Attendance.findOne({
            where: {
                studentId,
                date,
            },
        });
        return attendance;
    }

    async findById(id) {
        const attendance = await Attendance.findByPk(id, {
            include: [
                {
                    model: Student,
                    as: "student",
                    attributes: ["id", "name", "email"],
                },
            ],
        });
        return attendance;
    }

    async findAll() {
        const attendances = await Attendance.findAll({
            include: [
                {
                    model: Student,
                    as: "student",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [["date", "DESC"]],
        });
        return attendances;
    }

    async findByStudentId(studentId) {
        const attendances = await Attendance.findAll({
            where: { studentId },
            order: [["date", "DESC"]],
        });
        return attendances;
    }

    async findByDateRange(startDate, endDate) {
        const attendances = await Attendance.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: [
                {
                    model: Student,
                    as: "student",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [["date", "DESC"]],
        });
        return attendances;
    }

    async delete(id) {
        const attendance = await Attendance.findByPk(id);
        if (!attendance) return null;

        await attendance.destroy();

        return attendance;
    }
}
