import AppError from "../../errors/app-error.js";
import { SequelizeStudentsRepository } from "../../repositories/sequelize/sequelize-students-repository.js";
import { CreateStudentService } from "../../services/create-student-service.js";
import { FindStudentByIdService } from "../../services/find-student-by-id-service.js";
import { GetAllStudentsService } from "../../services/get-all-students-service.js";

export class StudentsController {
    async create(req, res, next) {
        try {
            const { name, email } = req.body;

            // Validate required fields
            if (!name || !email) {
                throw new AppError("Missing required fields: name and email are required", 400);
            }

            const studentsRepository = new SequelizeStudentsRepository();
            const createStudentService = new CreateStudentService(studentsRepository);

            const student = await createStudentService.execute(name, email);

            return res.status(201).json({
                student: student.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const studentsRepository = new SequelizeStudentsRepository();
            const findStudentByIdService = new FindStudentByIdService(studentsRepository);

            const student = await findStudentByIdService.execute(id);

            return res.status(200).json({
                student: student.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const studentsRepository = new SequelizeStudentsRepository();
            const getAllStudentsService = new GetAllStudentsService(studentsRepository);

            const students = await getAllStudentsService.execute();

            const studentsData = students.map((student) => student.toJSON());

            return res.status(200).json({
                students: studentsData,
            });
        } catch (error) {
            next(error);
        }
    }
}
