import express from "express";
import mongoose from "mongoose";
import booksRoutes from "./routes/books.routes.js";

const app = express();
const PORT = 3000;

// Hardcoded MongoDB URI (required by task)
const MONGO_URI = "mongodb://127.0.0.1:27017/sit725_5_3c";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.static("public"));
app.use(booksRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
