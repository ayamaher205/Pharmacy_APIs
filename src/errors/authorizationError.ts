import CustomeError from "./customError";

class AuthorizationErr extends CustomeError {
    constructor(message:string) {
        super(message, 403);
        Object.setPrototypeOf(this, AuthorizationErr.prototype);
    }
}

export default AuthorizationErr;
