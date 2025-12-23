import express from "express";
import { getAllBooks, getBookById } from "../controllers/books.controller.js";

const router = express.Router();

// Per task: routes/books.routes.js must mount ONLY these GET routes.
router.get("/", getAllBooks);
router.get("/:id", getBookById);

export default router;
