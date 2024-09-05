import CustomeError from "./customError";

class ValidationErr extends CustomeError {
    constructor(message:string) {
        super(`Validation failed: ${message!}`, 422);
        Object.setPrototypeOf(this, ValidationErr.prototype);
    }
}

export default ValidationErr;
