const Book = require("../models/book.model");

// GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ title: 1 });
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book by id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/integrity-check42
exports.integrityCheck = (req, res) => {
  // As per task: must return 204 No Content
  res.status(204).send();
};