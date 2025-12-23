import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import booksReadRoutes from "./routes/books.routes.js";
import booksSafeWriteRoutes from "./routes/books.safe.routes.js";

const app = express();

// ---- Configuration (per task: hardcode Mongo URI in server.js)
const MONGO_URI = "mongodb://127.0.0.1:27017/sit725_books_53c";
const PORT = process.env.PORT || 3000;

// ---- Middleware
app.use(express.json({ limit: "20kb" })); // small limit helps avoid abuse
app.use(express.urlencoded({ extended: false }));

// ---- Static files (vanilla HTML/CSS/JS only)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// ---- Required marker endpoint
app.get("/api/integrity-check42", (req, res) => res.status(204).send());

// ---- API routes
// IMPORTANT: keep routes/books.routes.js mounting GET-only routes
app.use("/api/books", booksReadRoutes);
// Safe write routes are mounted separately but under the same base path
app.use("/api/books", booksSafeWriteRoutes);

// ---- Simple 404 for API
app.use("/api", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    path: req.originalUrl
  });
});

// ---- Start after DB connects
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
