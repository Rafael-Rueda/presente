import AppError from "./app-error.js";

export default class StudentAlreadyExistsError extends AppError {
    constructor() {
        super("Student with this email already exists", 409);
    }
}
