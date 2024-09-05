import {
    ErrorRequestHandler, Request, Response, NextFunction,
} from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationError } from "joi";
import CustomeError from "../errors/customError";

const errorHandler: ErrorRequestHandler = (
    error: [Error, CustomeError, ValidationError],
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof CustomeError) {
        return res.status(error.statusCode).json(
            { message: error.message },
        );
    }
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            const targetField = error.meta?.target || "Unknown field";
            return res.status(409).json({
                error: "Duplication key",
                message: `This ${targetField} already exists.`,
            });
        }
        if (error.code === "P2025") {
            return res.status(404).json({
                error: "NotFound",
                message: `No ${error.meta?.modelName} found with the provided ID`,
            });
        }
        return res.status(400).json({
            error: "A database error occurred",
            message: error.message,
        });
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({
            error: "validation failed",
            message: `${error.details[0].message}`,
        });
    }
    return res.status(500).json({ message: "Unexpected error occurred" });
};

export default errorHandler;
