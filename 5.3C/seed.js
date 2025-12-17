import mongoose from "mongoose";
import Book from "./models/Book.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/sit725_5_3c";

const books = [
  { title: "The Three-Body Problem", author: "Liu Cixin", year: 2006, genre: "Science Fiction", price: "24.99" },
  { title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, genre: "Classic", price: "19.99" },
  { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Classic", price: "17.50" },
  { title: "The English Patient", author: "Michael Ondaatje", year: 1992, genre: "Historical Fiction", price: "21.00" },
  { title: "Small Gods", author: "Terry Pratchett", year: 1992, genre: "Fantasy", price: "18.75" }
];

await mongoose.connect(MONGO_URI);
await Book.deleteMany({});
await Book.insertMany(
  books.map(b => ({
    ...b,
    price: mongoose.Types.Decimal128.fromString(b.price)
  }))
);

console.log("Database seeded successfully");
process.exit();
