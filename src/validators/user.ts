import { NextFunction, Request, Response } from "express";
import joi from "joi";
import asyncWrapper from "../utils/asyncWrapper";

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const phoneRegex :RegExp = /^01[0125][0-9]{8}$/;
const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        first_name: joi.string().trim().min(3).max(30)
            .required(),
        last_name: joi.string().trim().min(3).max(30)
            .required(),
        email: joi.string().trim().email().max(50),
        password: joi.string().trim().regex(passwordRegex).required(),
        phone: joi.string().trim().length(11).regex(phoneRegex)
            .required(),
        address: joi.string().trim().max(50).required(),
        role: joi.string().trim().valid("user", "admin"),
    });
    const [validResults, err] = await asyncWrapper(schema.validateAsync(req.body));
    if (err) next(err);
    req.body = validResults;
    next();
};

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        email: joi.string().trim().required().email(),
        password: joi.string().trim().required(),
    });
    const [validResults, err] = await asyncWrapper(schema.validateAsync(req.body));
    if (err) next(err);
    req.body = validResults;
    next();
};
const updateValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        first_name: joi.string().trim().min(3).max(30),
        last_name: joi.string().trim().min(3).max(30),
        email: joi.string().trim().email().max(50),
        password: joi.string().trim().regex(passwordRegex),
        phone: joi.string().trim().length(11).regex(phoneRegex),
        address: joi.string().trim().max(50),
        role: joi.string().trim().valid("user", "admin"),
    });
    const [validResults, err] = await asyncWrapper(schema.validateAsync(req.body));
    if (err) next(err);
    req.body = validResults;
    next();
};

export default { registerValidator, loginValidator, updateValidator };
