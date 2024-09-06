import CustomeError from "./customError";

class AuthenticationErr extends CustomeError {
    constructor(message:string) {
        super(message, 401);
        Object.setPrototypeOf(this, AuthenticationErr.prototype);
    }
}

export default AuthenticationErr;
