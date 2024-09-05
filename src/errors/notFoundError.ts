import CustomeError from "./customError";

class NotFoundErr extends CustomeError {
    constructor(message: string) {
        super(`NotFound: ${message!}`, 500);
        Object.setPrototypeOf(this, NotFoundErr.prototype);
    }
}
export default NotFoundErr;
