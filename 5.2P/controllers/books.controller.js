const bookService = require("../services/books.service");

function getAllBooks(req, res) {
    res.json(bookService.getAllBooks());
}

function getBookById(req, res) {
    const id = req.params.id;
    const book = bookService.getBookById(id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
}

module.exports = { getAllBooks, getBookById };
