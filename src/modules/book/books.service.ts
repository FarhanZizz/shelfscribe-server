import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters, IReview } from "./book.interface";
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

  const books = await Book.find(whereConditions).sort({ _id: -1 });

  return books;
};

const addNewBook = async (book: IBook): Promise<IBook | null> => {
  const addedBook = await Book.create(book);

  return addedBook;
};

const getSingleBook = async (bookId: string): Promise<IBook | null> => {
  const book = await Book.findById(bookId);

  return book;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);

  return result;
};

const getRecentBooks = async (): Promise<IBook[] | null> => {
  const books = await Book.find().sort({ _id: -1 }).limit(10);

  return books;
};

const addReview = async (
  id: string,
  payload: IReview
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload } },
    {
      new: true,
    }
  );
  return result;
};

export const BookService = {
  addReview,
  getAllBooks,
  addNewBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getRecentBooks,
};
