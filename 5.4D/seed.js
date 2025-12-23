import mongoose from "mongoose";
import { Book, DEVELOPED_BY } from "./models/Book.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/sit725_books_53c";

const books = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2006,
    genre: "Science Fiction",
    summary: "A mysterious VR game and strange scientific events point to an unexpected extraterrestrial connection.",
    price: "24.99",
    developedBy: DEVELOPED_BY
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Fiction",
    summary: "An orphaned governess navigates love, independence, and moral choices in Victorian England.",
    price: "19.99",
    developedBy: DEVELOPED_BY
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    summary: "A witty exploration of manners, upbringing, and marriage in early 19th-century British society.",
    price: "17.50",
    developedBy: DEVELOPED_BY
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical",
    summary: "Four lives intersect in a ruined Italian villa at the end of World War II, bound by memory and loss.",
    price: "21.00",
    developedBy: DEVELOPED_BY
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "A philosophical satire about belief, institutions, and what it means to be a god on the Discworld.",
    price: "18.75",
    developedBy: DEVELOPED_BY
  }
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected:", MONGO_URI);

    await Book.deleteMany({});
    await Book.insertMany(books, { ordered: true });

    console.log("Seeded", books.length, "books.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

run();
