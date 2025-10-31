import StudentAlreadyExistsError from "../errors/student-already-exists-error.js";

export class CreateStudentService {
    constructor(studentsRepository) {
        this.studentsRepository = studentsRepository;
    }

    async execute(name, email) {
        const studentAlreadyExists = await this.studentsRepository.findByEmail(email);
        if (studentAlreadyExists) {
            throw new StudentAlreadyExistsError();
        }

        const student = await this.studentsRepository.create({
            name,
            email,
        });
        return student;
    }
}
