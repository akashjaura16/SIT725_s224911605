# SIT725 Task 5.3C – Books Catalog (MVC + MongoDB)

This project is a minimal implementation of the SIT725 5.3C task using the Week-5 MVC structure,
a MongoDB database, and a read-only API with a simple client.

## Requirements

- Node.js (v18+ recommended)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

## Install dependencies

```bash
npm install
```

## Seed the database

Make sure MongoDB is running, then:

```bash
npm run seed
```

This will create the `sit725_5_3c_books` database and insert five sample books with a Decimal128 `price` field.

## Run the server

```bash
npm start
```

The app will run at:

- http://localhost:3000/ – client page
- http://localhost:3000/api/books – list of books
- http://localhost:3000/api/books/:id – single book by id
- http://localhost:3000/api/integrity-check42 – returns HTTP 204 No Content
```

## Notes

- No book data is hardcoded in controllers or routes – everything comes from MongoDB.
- The client uses vanilla HTML/CSS/JS only (no React, Bootstrap, etc.), as required.
