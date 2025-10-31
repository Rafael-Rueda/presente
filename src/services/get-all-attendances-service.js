export class GetAllAttendancesService {
    constructor(attendancesRepository) {
        this.attendancesRepository = attendancesRepository;
    }

    async execute() {
        const attendances = await this.attendancesRepository.findAll();
        return attendances;
    }
}
