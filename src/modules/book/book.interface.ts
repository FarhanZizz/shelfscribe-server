import { Model } from "mongoose";

type IReview = {
  username: string;
  review: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  description?: string;
  publication: string;
  reviews?: IReview[];
  image?: string;
  userEmail: string;
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
