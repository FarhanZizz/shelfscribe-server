import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { BookService } from "./books.service";
import pick from "../../shared/pick";
import { bookFilterableFields } from "./book.constant";

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, bookFilterableFields);
    const result = await BookService.getAllBooks(filters);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const addNewBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = req.body;

    const result = await BookService.addNewBook(book);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  getAllBooks,
  addNewBook,
};
