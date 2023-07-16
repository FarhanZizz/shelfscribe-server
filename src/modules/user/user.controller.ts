import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import config from "../../config";

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
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body;
    const result = await UserService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged In successfully!",
      data: others,
    });
  } catch (error) {
    return next(error);
  }
};
export const UserController = {
  createUser,
  loginUser,
};
