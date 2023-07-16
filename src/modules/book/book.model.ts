/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  reviews: [
    {
      username: {
        type: String,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  imageURL: {
    type: String,
  },
});

export const Book = model<IBook, BookModel>("Book", bookSchema);
