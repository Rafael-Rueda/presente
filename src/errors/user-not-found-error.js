import AppError from "./app-error.js";

class UserNotFoundError extends AppError {
    constructor() {
        super("User not found", 404);
    }
}

export default UserNotFoundError;
