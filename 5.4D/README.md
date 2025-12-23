# SIT725 Task 5.4D — Books MVC + Database (Safe Writes)

This project keeps a simple MVC layout and MongoDB-backed **Books** collection, then adds:

- **Field-level validation rules** (Mongoose schema)
- **Safe-write endpoints** for **create** and **update**
- Strict server-side input processing (reject unexpected fields)
- Required endpoint: `GET /api/integrity-check42` → **204 No Content**
- Student ID marker: **developedBy = s224911605**

## 1) Install & Run

```bash
npm install
npm run seed
npm start
```

Open: `http://localhost:3000`

MongoDB URI is hardcoded in `server.js` as required:
`mongodb://127.0.0.1:27017/sit725_books_53c`

## 2) Routes (Contract)

Read routes (must remain in `routes/books.routes.js`):
- `GET /api/books` → list all
- `GET /api/books/:id` → single by id

Safe writes (mounted separately):
- `POST /api/books`
  - **201** on success (created JSON)
  - **409** on duplicate `id`
  - **400** on validation failure / unexpected fields
- `PUT /api/books/:id`
  - **200** on success (updated JSON)
  - **404** if record doesn't exist
  - **400** on validation failure / unexpected fields / attempts to update `id`

## 3) Validation Rules (Summary)

Rules are implemented in `models/Book.js`.

- **id**: required, unique, regex `^b[0-9A-Za-z_-]{1,10}$`
- **title**: required, 1–120 chars
- **author**: required, 2–80 chars
- **year**: required, integer, 1450..(currentYear+1)
- **genre**: required, enum of allowed genres
- **summary**: required, 10–1000 chars
- **price**: required, Decimal128, 0.01..9999.99

## 4) Copy/Paste One‑Liners for Report (Console)

### Duplicate key (run twice) → expect 409 on second run
```js
fetch('/api/books', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ id:'bX', title:'X', author:'AA', year:2000, genre:'Other', summary:'This is a valid summary', price:'1.00' })
}).then(r => r.text().then(t => console.log('CREATE dup step →', r.status, t)));
```

### Unexpected field → expect 400
```js
fetch('/api/books', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ id:'bY', title:'X', author:'AA', year:2000, genre:'Other', summary:'This is a valid summary', price:'1.00', hacker:'x' })
}).then(r => r.text().then(t => console.log('Unexpected field →', r.status, t)));
```

### Invalid id format → expect 400
```js
fetch('/api/books', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ id:'NOT_OK', title:'X', author:'AA', year:2000, genre:'Other', summary:'This is a valid summary', price:'1.00' })
}).then(r => r.text().then(t => console.log('Bad id →', r.status, t)));
```

### Year not integer → expect 400
```js
fetch('/api/books', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ id:'bZ', title:'X', author:'AA', year:2000.5, genre:'Other', summary:'This is a valid summary', price:'1.00' })
}).then(r => r.text().then(t => console.log('Bad year →', r.status, t)));
```

### Price out of range → expect 400
```js
fetch('/api/books', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ id:'bP', title:'X', author:'AA', year:2000, genre:'Other', summary:'This is a valid summary', price:'0.00' })
}).then(r => r.text().then(t => console.log('Bad price →', r.status, t)));
```

### Update attempts to change id → expect 400
```js
fetch('/api/books/b1', {
  method: 'PUT',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ id:'b999', title:'New Title' })
}).then(r => r.text().then(t => console.log('Immutable id →', r.status, t)));
```

### Update non-existent record → expect 404
```js
fetch('/api/books/bDOESNOTEXIST', {
  method: 'PUT',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ title:'New Title' })
}).then(r => r.text().then(t => console.log('Update missing →', r.status, t)));
```

## 5) Notes for Viva

Be ready to explain:
- Why schema validation must be server-side (client checks are bypassable)
- How you reject unexpected fields (whitelist + 400)
- How you map Mongo duplicate key to 409
- How `runValidators: true` enforces schema rules on update
