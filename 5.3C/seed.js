import mongoose from "mongoose";
import Book from "./models/book.model.js";

await mongoose.connect("mongodb://127.0.0.1:27017/booksdb");

await Book.deleteMany();

await Book.insertMany([
  {
    title: "The Three-Body Problem",
    authors: "Liu Cixin",
    year: 2006,
    genre: "Science Fiction",
    summary: "A science fiction novel about humanity's first contact with an alien civilisation.",
    price: 29.99
  },
  {
    title: "Jane Eyre",
    authors: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "A novel following the emotions and experiences of its eponymous heroine.",
    price: 22.00
  },
  {
    title: "Pride and Prejudice",
    authors: "Jane Austen",
    year: 1813,
    genre: "Romance",
    summary: "A romantic novel that critiques the British landed gentry.",
    price: 22.00
  },
  {
    title: "The English Patient",
    authors: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "A novel about four people brought together at the end of World War II.",
    price: 25.39
  },
  {
    title: "Small Gods",
    authors: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "A satirical fantasy novel about religion and belief.",
    price: 31.99
  }
]);

console.log("Database seeded");
process.exit();
