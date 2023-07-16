import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/all-books", BookController.getAllBooks);
router.post("/add-new-book", auth(), BookController.addNewBook);

export const BookRoutes = router;
