abstract class CustomeError extends Error {
    statusCode:number;
    constructor(message:string, status:number) {
        super(message);
        this.statusCode = status;
        Object.setPrototypeOf(this, CustomeError.prototype);
    }
}

export default CustomeError;
