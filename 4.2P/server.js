const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ====== Middleware ======
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ====== MongoDB Connection ======
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sit725_simple_book_store';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedSampleDataIfEmpty();
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });

// ====== Book Model ======
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

// ====== Seed Sample Data ======
async function seedSampleDataIfEmpty() {
  const count = await Book.countDocuments();
  if (count === 0) {
    console.log('📚 No books found. Inserting sample data...');
    await Book.insertMany([
      {
        title: 'Cloud Fundamentals with AWS',
        author: 'A. Sharma',
        price: 49.99,
        genre: 'Technology',
        year: 2023
      },
      {
        title: 'Learning Node.js the Practical Way',
        author: 'J. Patel',
        price: 39.5,
        genre: 'Programming',
        year: 2022
      },
      {
        title: 'Design Thinking for Beginners',
        author: 'K. Nguyen',
        price: 29.0,
        genre: 'Business',
        year: 2021
      }
    ]);
    console.log('✅ Sample books inserted.');
  }
}

// ====== REST API Routes ======

// GET /api/books - list all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ year: -1 });
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// POST /api/books - add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, price, genre, year } = req.body;
    if (!title || !author || !price || !genre || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const book = new Book({ title, author, price, genre, year });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// DELETE /api/books/:id - delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// PUT /api/books/:id - update a book
app.put('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, genre, year } = req.body;

    const updated = await Book.findByIdAndUpdate(
      id,
      { title, author, price, genre, year },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// ====== Start Server ======
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
