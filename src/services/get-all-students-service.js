export class GetAllStudentsService {
    constructor(studentsRepository) {
        this.studentsRepository = studentsRepository;
    }

    async execute() {
        const students = await this.studentsRepository.findAll();
        return students;
    }
}
