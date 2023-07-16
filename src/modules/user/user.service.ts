import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { ILoginUser, ILoginUserResponse, IUser } from "./user.interface";
import { User } from "./user.model";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  return createdUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const isUserExist = await User.findOne(
    { email },
    { email: 1, password: 1, _id: 1 }
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { _id } = isUserExist;

  const accessToken = jwt.sign({ _id, email }, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });

  const refreshToken = jwt.sign(
    { _id, email },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
};
