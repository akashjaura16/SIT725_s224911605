import mongoose from "mongoose";
import Book from "./models/Book.js";

const MONGO_URI = "mongodb://localhost:27017/booksdb";

await mongoose.connect(MONGO_URI);

await Book.deleteMany();

await Book.insertMany([
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "First novel.",
    price: mongoose.Types.Decimal128.fromString("24.99")
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "A novel about personal growth.",
    price: mongoose.Types.Decimal128.fromString("19.99")
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    summary: "A romantic novel.",
    price: mongoose.Types.Decimal128.fromString("17.50")
  },
  {
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "A tragic love story.",
    price: mongoose.Types.Decimal128.fromString("21.00")
  },
  {
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "A Discworld novel.",
    price: mongoose.Types.Decimal128.fromString("18.75")
  }
]);

console.log("Database seeded successfully");
process.exit();
