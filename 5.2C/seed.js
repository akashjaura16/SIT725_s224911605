const mongoose = require("mongoose");
const Book = require("./models/book.model");

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/booksdb_5_3c");
    console.log("✅ Connected to MongoDB for seeding");

    await Book.deleteMany({});

    const books = [
      {
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018,
        genre: "Self-help",
        price: mongoose.Types.Decimal128.fromString("29.99")
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        genre: "Fantasy",
        price: mongoose.Types.Decimal128.fromString("24.50")
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2008,
        genre: "Programming",
        price: mongoose.Types.Decimal128.fromString("59.99")
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        year: 1997,
        genre: "Finance",
        price: mongoose.Types.Decimal128.fromString("19.95")
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        year: 1997,
        genre: "Fantasy",
        price: mongoose.Types.Decimal128.fromString("22.90")
      }
    ];

    await Book.insertMany(books);
    console.log("🌱 Database seeded with books");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

seed();