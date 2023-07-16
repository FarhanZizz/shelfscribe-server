import { Model } from "mongoose";

type IReview = {
  username: string;
  review: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: IReview[];
  imageURL?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
