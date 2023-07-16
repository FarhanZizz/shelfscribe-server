import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";

const getAllBooks = async (filters: IBookFilters): Promise<IBook[] | null> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const books = await Book.find(whereConditions);

  return books;
};

const addNewBook = async (book: IBook): Promise<IBook | null> => {
  const addedBook = await Book.create(book);

  return addedBook;
};

export const BookService = {
  getAllBooks,
  addNewBook,
};
