import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./auth";
import AuthorizationErr from "../errors/authorizationError";

const authorizeAdmin = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    if (req.user?.role !== "admin") return next(new AuthorizationErr("Only Admins allowed"));
    next();
};

export default authorizeAdmin;
