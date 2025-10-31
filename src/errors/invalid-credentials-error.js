import AppError from "./app-error.js";

class InvalidCredentialsError extends AppError {
    constructor() {
        super("Invalid Credentials", 401);
    }
}

export default InvalidCredentialsError;
