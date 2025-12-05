# SIT725 Task 4.2P – Add a Database (Simple Book Store)

This project is a **Simple Book Store** web app created for **SIT725 4.2P – Add a Database**.

- Frontend: HTML, CSS, JavaScript (served from `public/`)
- Backend: Node.js + Express
- Database: MongoDB (via Mongoose)
- Data: Books with fields: **title, author, price, genre, year**

The goal is to show that the previous Week 3 client-side functionality has been moved to the **server** and data is now stored in a **database**.

---

## 1. Project Structure

```text
simple-book-store-sit725-4.2P/
├── package.json
├── server.js
├── README.md
└── public/
    ├── index.html
    ├── styles.css
    └── script.js
```

---

## 2. Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally (e.g., `mongodb://127.0.0.1:27017`)

You can use **MongoDB Community Server** or **MongoDB Atlas** (then set `MONGO_URI`).

---

## 3. Install Dependencies

From the project folder, run:

```bash
npm install
```

This installs:

- express
- mongoose
- cors
- nodemon (dev dependency)

---

## 4. Configure MongoDB Connection (Optional)

By default, the app connects to:

```text
mongodb://127.0.0.1:27017/sit725_simple_book_store
```

You can override this by setting an environment variable:

**Windows PowerShell:**

```bash
$env:MONGO_URI="your-mongodb-connection-string"
npm start
```

**macOS / Linux:**

```bash
export MONGO_URI="your-mongodb-connection-string"
npm start
```

---

## 5. Run the Application

### Development (with auto-restart)

```bash
npm run dev
```

### Production / simple run

```bash
npm start
```

You should see output like:

```text
✅ Connected to MongoDB
📚 No books found. Inserting sample data...
✅ Sample books inserted.
🚀 Server is running on http://localhost:3000
```

Open your browser at:

```text
http://localhost:3000
```

---

## 6. Features to Demonstrate for 4.2P

1. **Data stored in MongoDB**  
   - Books are saved in the `sit725_simple_book_store` database.
   - Collection: `books`.

2. **Server-side API (Express)**  
   - `GET /api/books` – fetch all books  
   - `POST /api/books` – add a new book  
   - `DELETE /api/books/:id` – delete a book  
   - (Optional) `PUT /api/books/:id` – update a book

3. **Client-side uses `fetch()` to call the server**  
   - No hard-coded list of books in JavaScript.
   - All data is retrieved from the backend API.

4. **Sample Data**  
   When the database is empty, the server **automatically inserts** three example books (technology, programming, business).

---

## 7. Evidence for OnTrack Submission

For your PDF:

1. Screenshot of **terminal** showing:
   - `npm start` or `npm run dev`
   - MongoDB connection success message
2. Screenshot of **webpage** showing:
   - Book list table with sample data
   - Add Book form
3. Screenshot after **adding a new book** via the form.
4. (Optional) Screenshot of MongoDB Compass showing the `books` collection.

---

## 8. GitHub and Repo Link

1. Create a new **GitHub repo** for Week 4 (Prac 4 style).
2. Push this code to your repo.
3. Copy the repository URL for OnTrack.
4. Export your screenshots and brief explanation to **PDF** and submit to OnTrack.

---

## 9. How this differs from Prac 4

- Custom **domain** (Book Store instead of example from prac).
- Different **data fields**: `title, author, price, genre, year`.
- Different **sample records**.
- Your own comments and screenshots.

You can further customise CSS, table layout, or add more routes (e.g., search by genre) to make it even more unique.
