const express = require("express");
const router = express.Router();
const controller = require("../controllers/books.controller");

// Routes with no logic here
router.get("/api/books", controller.getAllBooks);
router.get("/api/books/:id", controller.getBookById);
router.get("/api/integrity-check42", controller.integrityCheck);

module.exports = router;