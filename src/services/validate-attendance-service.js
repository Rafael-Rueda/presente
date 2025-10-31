import AttendanceAlreadyExistsError from "../errors/attendance-already-exists-error.js";
import StudentNotFoundError from "../errors/student-not-found-error.js";

export class ValidateAttendanceService {
    constructor(attendancesRepository, studentsRepository) {
        this.attendancesRepository = attendancesRepository;
        this.studentsRepository = studentsRepository;
    }

    async execute(studentId, date) {
        // Verify student exists
        const student = await this.studentsRepository.findById(studentId);
        if (!student) {
            throw new StudentNotFoundError();
        }

        // Check if attendance already exists for this student on this date
        const existingAttendance = await this.attendancesRepository.findByStudentAndDate(studentId, date);
        if (existingAttendance) {
            throw new AttendanceAlreadyExistsError();
        }

        // Create attendance record
        const attendance = await this.attendancesRepository.create({
            studentId,
            date,
        });

        return attendance;
    }
}
