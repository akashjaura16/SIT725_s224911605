# SIT725 - Task 5.3C: MVC + Database (Books Catalog)

This project implements a **read‑only Books Catalog** using:

- Node.js + Express
- MongoDB with Mongoose
- MVC structure (models, controllers, routes)
- Vanilla HTML/CSS/JS client in `/public`

## Features

- `GET /api/books` – returns all books from MongoDB
- `GET /api/books/:id` – returns a single book by its `_id`
- `GET /api/integrity-check42` – returns **204 No Content** (required by task)
- Frontend:
  - Shows all books as cards
  - Click a card to view full details on the right
  - Prices displayed in **AUD**, stored as `Decimal128` in MongoDB

## Database

- Local MongoDB instance
- Database name: `booksdb_5_3c`
- Collection: `books`
- Schema fields (see `models/book.model.js`):
  - `title` (String)
  - `author` (String)
  - `year` (Number)
  - `genre` (String)
  - `price` (Decimal128, AUD)

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make sure MongoDB is running on your machine (default: `mongodb://localhost:27017`).

3. Seed the database:

   ```bash
   npm run seed
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open the client in a browser:

   ```
   http://localhost:3000
   ```

You should see the Books Catalog UI, with all books loaded from the `/api/books` endpoint.