import StudentNotFoundError from "../errors/student-not-found-error.js";

export class FindStudentByIdService {
    constructor(studentsRepository) {
        this.studentsRepository = studentsRepository;
    }

    async execute(id) {
        const student = await this.studentsRepository.findById(id);
        if (!student) {
            throw new StudentNotFoundError();
        }
        return student;
    }
}
