const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books.controller");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

module.exports = router;
