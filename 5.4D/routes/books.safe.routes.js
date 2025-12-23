import express from "express";
import { createBook, updateBook } from "../controllers/books.controller.js";

const router = express.Router();

// Safe write endpoints (design allowed by task; mounted separately in server.js)
router.post("/", createBook);
router.put("/:id", updateBook);

export default router;
