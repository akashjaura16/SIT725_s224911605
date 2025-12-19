import express from "express";
import {
  getAllBooks,
  getBookById
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.get("/integrity-check42", (req, res) => res.sendStatus(204));

export default router;
