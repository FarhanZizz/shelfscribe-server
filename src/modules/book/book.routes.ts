import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/all-books", BookController.getAllBooks);
router.get("/recent-books", BookController.getRecentBooks);
router.post("/add-new-book", auth(), BookController.addNewBook);
router.get("/book/:id", BookController.getSingleBook);
router.patch("/book/:id", auth(), BookController.updateBook);
router.delete("/book/:id", auth(), BookController.deleteBook);

export const BookRoutes = router;
