import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import AuthenticationErr from "../errors/authentication";
import asyncWrapper from "../utils/asyncWrapper";
import prismaClient from "../app";
import DataBaseErr from "../errors/databaseError";
import BadRequest from "../errors/badRequest";
import Tokens from "../utils/auth";
import NotFoundErr from "../errors/notFoundError";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const password = await bcrypt.hash(req.body.password, 10);
    req.body.password = password;
    const [user, err] = await asyncWrapper(prismaClient.user.create({
        data:
            req.body,
    }));
    if (err) {
        return next(err);
    }
    if (!user) {
        return next(new DataBaseErr("failed to create user!"));
    }
    return res.status(200).json({ data: user });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prismaClient.user.findUnique({ where: { email: req.body.email } });
    if (!user) return next(new AuthenticationErr("wrong email or password, please try again!."));
    const verificationPassword = await bcrypt.compare(req.body.password, user.password);
    if (!verificationPassword) return next(new AuthenticationErr("wrong email or password, please try again!."));
    const token:string = Tokens.generateAccessToken(user.id, user.email);
    const refreshToken = Tokens.generateRefreshToken(user.id, user.email);

    return res.status(200).json({ token, refreshToken });
};

const refresh = async (req:Request, res:Response, next:NextFunction) => {
    const refreshToken: string | undefined = req.headers.authorization?.replace("Bearer ", "");
    if (!refreshToken) return next(new BadRequest("refresh token is required, please try again!"));
    const [decoded, err] = await asyncWrapper(
        Tokens.verifyToken(refreshToken, process.env.SECRET_KEY!),
    );
    if (err) return next(new BadRequest("invalid or expired token!"));
    const { email } = decoded as {email:string};
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) return next(new NotFoundErr("no user found with this email"));
    const token:string = Tokens.generateAccessToken(user.id, user.email);
    return res.status(200).json({ token });
};

export default { register, login, refresh };
