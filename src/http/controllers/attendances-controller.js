import AppError from "../../errors/app-error.js";
import { SequelizeAttendancesRepository } from "../../repositories/sequelize/sequelize-attendances-repository.js";
import { SequelizeStudentsRepository } from "../../repositories/sequelize/sequelize-students-repository.js";
import { GetAllAttendancesService } from "../../services/get-all-attendances-service.js";
import { GetStudentAttendancesService } from "../../services/get-student-attendances-service.js";
import { ValidateAttendanceService } from "../../services/validate-attendance-service.js";

export class AttendancesController {
    async validate(req, res, next) {
        try {
            const { studentId, date } = req.body;

            // Validate required fields
            if (!studentId) {
                throw new AppError("Missing required field: studentId is required", 400);
            }

            // If date is not provided, use current date
            const attendanceDate = date || new Date().toISOString().split("T")[0];

            const attendancesRepository = new SequelizeAttendancesRepository();
            const studentsRepository = new SequelizeStudentsRepository();
            const validateAttendanceService = new ValidateAttendanceService(attendancesRepository, studentsRepository);

            const attendance = await validateAttendanceService.execute(studentId, attendanceDate);

            return res.status(201).json({
                attendance: attendance.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const attendancesRepository = new SequelizeAttendancesRepository();
            const getAllAttendancesService = new GetAllAttendancesService(attendancesRepository);

            const attendances = await getAllAttendancesService.execute();

            const attendancesData = attendances.map((attendance) => attendance.toJSON());

            return res.status(200).json({
                attendances: attendancesData,
            });
        } catch (error) {
            next(error);
        }
    }

    async getByStudent(req, res, next) {
        try {
            const { studentId } = req.params;

            const attendancesRepository = new SequelizeAttendancesRepository();
            const studentsRepository = new SequelizeStudentsRepository();
            const getStudentAttendancesService = new GetStudentAttendancesService(
                attendancesRepository,
                studentsRepository,
            );

            const attendances = await getStudentAttendancesService.execute(studentId);

            const attendancesData = attendances.map((attendance) => attendance.toJSON());

            return res.status(200).json({
                attendances: attendancesData,
            });
        } catch (error) {
            next(error);
        }
    }
}
