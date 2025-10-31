import AppError from "./app-error.js";

export default class AttendanceNotFoundError extends AppError {
    constructor() {
        super("Attendance not found", 404);
    }
}
