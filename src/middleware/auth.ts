import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import BadRequest from "../errors/badRequestError";
import asyncWrapper from "../utils/asyncWrapper";
import Token from "../utils/auth";
import prismaClient from "../app";
import DataBaseErr from "../errors/databaseError";
import NotFoundErr from "../errors/notFoundError";

export interface AuthenticatedRequest extends Request {
    user?: User;
}

const authenticateUser = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    const token : string | undefined = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return next(new BadRequest("Token is required!"));
    const [payload, err] = await asyncWrapper(Token.verifyToken(token, process.env.SECRET_KEY!));
    if (err) return next(new BadRequest("invalid or expired token!"));
    const { email } = payload as {email:string};
    const [user, dbErr] = await asyncWrapper(prismaClient.user.findUnique({ where: { email } }));
    if (dbErr) return next(new DataBaseErr("DataBase error occured, please try again later!"));
    if (!user) return next(new NotFoundErr("No user found with this email"));
    req.user = user;
    next();
};

export default authenticateUser;
