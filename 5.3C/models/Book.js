import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  authors: String,
  year: Number,
  genre: String,
  summary: String,
  price: mongoose.Schema.Types.Decimal128
});

export default mongoose.model("Book", bookSchema);
