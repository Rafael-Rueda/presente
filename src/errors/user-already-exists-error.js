import AppError from "./app-error.js";

class UserAlreadyExistsError extends AppError {
    constructor() {
        super("User already exists", 409);
    }
}

export default UserAlreadyExistsError;
