import Book from '../models/Book.js';

// GET /api/books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ title: 1 }).lean();
    // When using .lean(), price is a Decimal128 object; convert manually
    const normalised = books.map((b) => ({
      ...b,
      id: b._id,
      _id: undefined,
      __v: undefined,
      price:
        b.price && typeof b.price === 'object'
          ? parseFloat(b.price.toString())
          : b.price,
    }));
    res.json(normalised);
  } catch (err) {
    console.error('Error in getAllBooks:', err);
    res.status(500).json({ message: 'Server error while fetching books.' });
  }
};

// GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).lean();

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const normalised = {
      ...book,
      id: book._id,
      _id: undefined,
      __v: undefined,
      price:
        book.price && typeof book.price === 'object'
          ? parseFloat(book.price.toString())
          : book.price,
    };

    res.json(normalised);
  } catch (err) {
    console.error('Error in getBookById:', err);
    // If the id is not a valid ObjectId, this will catch the cast error.
    res.status(400).json({ message: 'Invalid book ID.' });
  }
};

// GET /api/integrity-check42
export const integrityCheck = (req, res) => {
  // The task requires this endpoint to return 204 No Content
  res.status(204).send();
};
