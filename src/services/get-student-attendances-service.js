import StudentNotFoundError from "../errors/student-not-found-error.js";

export class GetStudentAttendancesService {
    constructor(attendancesRepository, studentsRepository) {
        this.attendancesRepository = attendancesRepository;
        this.studentsRepository = studentsRepository;
    }

    async execute(studentId) {
        // Verify student exists
        const student = await this.studentsRepository.findById(studentId);
        if (!student) {
            throw new StudentNotFoundError();
        }

        const attendances = await this.attendancesRepository.findByStudentId(studentId);
        return attendances;
    }
}
