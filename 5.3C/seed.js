import mongoose from 'mongoose';
import Book from './models/Book.js';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/sit725_5_3c_books';

const booksData = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Software Engineering',
    year: 2008,
    isbn: '9780132350884',
    price: '59.99',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    genre: 'Software Engineering',
    year: 1999,
    isbn: '9780201616224',
    price: '54.95',
  },
  {
    title: 'Design Patterns',
    author: 'Erich Gamma et al.',
    genre: 'Software Design',
    year: 1994,
    isbn: '9780201633610',
    price: '69.50',
  },
  {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    genre: 'Programming',
    year: 2008,
    isbn: '9780596517748',
    price: '39.99',
  },
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen et al.',
    genre: 'Algorithms',
    year: 2009,
    isbn: '9780262033848',
    price: '120.00',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    await Book.deleteMany({});
    console.log('🧹 Cleared existing books collection');

    // Insert books with Decimal128 price
    const docs = booksData.map((b) => ({
      ...b,
      price: mongoose.Types.Decimal128.fromString(b.price),
    }));

    await Book.insertMany(docs);
    console.log('📚 Inserted sample books');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB. Seeding complete.');
  } catch (err) {
    console.error('❌ Error while seeding database:', err);
    process.exitCode = 1;
  }
}

seed();
