import CustomeError from "./customError";

class DataBaseErr extends CustomeError {
    constructor(message:string) {
        super(message, 500);
        Object.setPrototypeOf(this, DataBaseErr.prototype);
    }
}

export default DataBaseErr;
