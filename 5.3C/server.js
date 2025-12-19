import express from "express";
import mongoose from "mongoose";
import booksRoutes from "./routes/books.routes.js";

const app = express();

app.use(express.static("public"));
app.use("/api", booksRoutes);

await mongoose.connect("mongodb://127.0.0.1:27017/booksdb");

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
