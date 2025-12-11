import express from 'express';
import { getAllBooks, getBookById, integrityCheck } from '../controllers/books.controller.js';

const router = express.Router();

// Mount only the required routes
router.get('/books', getAllBooks);           // GET /api/books
router.get('/books/:id', getBookById);       // GET /api/books/:id
router.get('/integrity-check42', integrityCheck); // GET /api/integrity-check42

export default router;
