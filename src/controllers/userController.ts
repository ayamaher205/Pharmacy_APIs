/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prismaClient from "../app";
import "dotenv/config";
import asyncWrapper from "../utils/asyncWrapper";
import DataBaseErr from "../errors/databaseError";
import NotFoundErr from "../errors/notFoundError";
import exclude from "../utils/excludePassword";

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const [user, err] = await asyncWrapper(prismaClient.user.findUnique(
        {
            where: { id: Number(req.params.id) },
        },
    ));
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message}`));
    }
    if (!user) {
        return next(new NotFoundErr("there isn't user with this id"));
    }
    const userWithoutPassword = exclude(user, ["password"]);
    return res.status(200).json({ data: userWithoutPassword });
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const [users, err] = await asyncWrapper(prismaClient.user.findMany({
    }));
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message}`));
    }
    const usersWithoutPassword = users?.map((user) => exclude(user, ["password"]));
    return res.status(200).json({ data: usersWithoutPassword });
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const [user, err] = await asyncWrapper(prismaClient.user.delete(
        { where: { id: req.body.id } },
    ));
    if (err) {
        return next(new DataBaseErr(`DataBase Error: ${err.message}`));
    }
    return res.status(201).json({ message: `user with id ${user?.id} deleted succefully` });
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const [updatedUser, err] = await asyncWrapper(prismaClient.user.update(
        {
            data: req.body,
            where: { id: Number(req.params.id) },
        },
    ));
    if (err) return next(err);
    const userWithoutPassword = exclude(updatedUser!, ["password"]);
    return res.status(200).json({ userWithoutPassword });
};

export default {
    getUserById, getAllUsers, deleteUser, updateUser,
};
