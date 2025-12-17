import express from "express";
import { getAllBooks, getBookById } from "../controllers/books.controller.js";

const router = express.Router();

router.get("/api/books", getAllBooks);
router.get("/api/books/:id", getBookById);
router.get("/api/integrity-check42", (req, res) => res.sendStatus(204));

export default router;
