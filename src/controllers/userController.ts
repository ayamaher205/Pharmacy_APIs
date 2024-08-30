/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import prismaClient from "../app";
import asyncWrapper from "../utils/asyncWrapper";
import DataBaseErr from "../errors/databaseError";
import NotFoundErr from "../errors/notFoundError";

const create = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const [user, err] = await asyncWrapper(prismaClient.user.create({
        data:
            req.body,
    }));
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message!}`));
    }
    if (!user) {
        return next(new DataBaseErr("failed to create user!"));
    }
    return res.status(200).json(user);
};
const findUserById = async (req:Request, res:Response, next:NextFunction) => {
    const [user, err] = await asyncWrapper(prismaClient.user.findUnique(
        { where: req.body.id },
    ));
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message}`));
    }
    if (!user) {
        // edit it
        return next(new NotFoundErr("there isn't user with this id"));
    }
    return res.status(200).json({ data: user });
};
const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    const [users, err] = await asyncWrapper(prismaClient.user.findMany());
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message}`));
    }
    return res.status(200).json({ data: users });
};

const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    const [user, err] = await asyncWrapper(prismaClient.user.delete({ where: req.body.id }));
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message}`));
    }
    return res.status(200).json({ data: user });
};
export default {
    create, findUserById, getAllUsers, deleteUser,
};
