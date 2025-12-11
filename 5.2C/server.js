const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const booksRoutes = require("./routes/books.routes");

const app = express();

// --- MongoDB connection (hardcoded URI as required) ---
mongoose
  .connect("mongodb://localhost:27017/booksdb_5_3c")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Middleware ---
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---
app.use(booksRoutes);

// --- Fallback route for unknown paths (optional) ---
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});