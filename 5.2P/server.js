const express = require("express");
const path = require("path");

const booksRouter = require("./routes/books.routes");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/books", booksRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
