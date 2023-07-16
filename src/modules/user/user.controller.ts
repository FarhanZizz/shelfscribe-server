import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const result = await UserService.createUser(user);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

export const UserController = {
  createUser,
};
