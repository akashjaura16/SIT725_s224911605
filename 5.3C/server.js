import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import booksRouter from './routes/books.routes.js';

// ---- Basic setup ----
const app = express();
const PORT = process.env.PORT || 3000;

// Needed to resolve __dirname when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Middleware ----
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- MongoDB connection ----
// Hardcode the MongoDB URI as required in the task instructions.
// Make sure MongoDB is running locally before starting the server.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/sit725_5_3c_books';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// ---- Routes ----
app.use('/api', booksRouter);

// Simple root route – serves index.html from /public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
