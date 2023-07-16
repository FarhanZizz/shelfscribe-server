import { Model } from "mongoose";

export type IUser = {
  name: string;
  password: string;
  email: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
