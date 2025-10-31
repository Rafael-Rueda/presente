import AppError from "./app-error.js";

export default class AttendanceAlreadyExistsError extends AppError {
    constructor() {
        super("Attendance already registered for this student on this date", 409);
    }
}
