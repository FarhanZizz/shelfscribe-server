import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { BookService } from "./books.service";
import pick from "../../shared/pick";
import { bookFilterableFields } from "./book.constant";
import { Book } from "./book.model";
import ApiError from "../../errors/ApiError";

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
const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.id;

    const result = await BookService.getSingleBook(bookId);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;

    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
    }

    // Check if the books user's email matches the verified user's email
    if (book.userEmail !== req.user.email) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You are not authorized to update this Book"
      );
    }

    const result = await BookService.updateBook(bookId, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
    }

    // Check if the books user's email matches the verified user's email
    if (book.userEmail !== req.user.email) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You are not authorized to delete this Book"
      );
    }

    const result = await BookService.deleteBook(bookId);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRecentBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookService.getRecentBooks();

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Recent Books retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;

    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
    }

    const result = await BookService.addReview(bookId, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Review added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  addReview,
  getAllBooks,
  addNewBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getRecentBooks,
};
