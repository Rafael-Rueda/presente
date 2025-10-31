import AppError from "./app-error.js";

export default class StudentNotFoundError extends AppError {
    constructor() {
        super("Student not found", 404);
    }
}
