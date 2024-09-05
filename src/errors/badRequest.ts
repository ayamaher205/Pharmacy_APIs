import CustomeError from "./customError";

class BadRequest extends CustomeError {
    constructor(message:string) {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}

export default BadRequest;
