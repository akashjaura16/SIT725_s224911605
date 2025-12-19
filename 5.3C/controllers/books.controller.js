import Book from "../models/Book.js";

/**
 * GET /api/books
 */
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.json(
      books.map((b) => ({
        ...b.toObject(),
        price: b.price.toString()
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/books/:id
 */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.sendStatus(404);

    res.json({
      ...book.toObject(),
      price: book.price.toString()
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};
