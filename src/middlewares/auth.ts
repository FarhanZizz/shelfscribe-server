import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import config from "../config";
import jwt from "jsonwebtoken";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
