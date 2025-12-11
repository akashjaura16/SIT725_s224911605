const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true } // AUD price
});

module.exports = mongoose.model("Book", bookSchema);