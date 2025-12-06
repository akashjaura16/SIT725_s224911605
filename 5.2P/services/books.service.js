const Book = require("../models/book.model");

const books = [
    new Book(
        "b1",
        "The Three-Body Problem",
        "Liu Cixin",
        2008,
        "Science Fiction",
        "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy..."
    ),
    new Book(
        "b2",
        "Jane Eyre",
        "Charlotte Brontë",
        1847,
        "Classic",
        "An orphaned governess confronts class, morality, and love at Thornfield Hall..."
    ),
    new Book(
        "b3",
        "Pride and Prejudice",
        "Jane Austen",
        1813,
        "Classic",
        "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement..."
    ),
    new Book(
        "b4",
        "The English Patient",
        "Michael Ondaatje",
        1992,
        "Historical Fiction",
        "In a ruined Italian villa at the end of WWII, four strangers..."
    ),
    new Book(
        "b5",
        "Small Gods",
        "Terry Pratchett",
        1992,
        "Fantasy",
        "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma..."
    )
];

function getAllBooks() {
    return books;
}

function getBookById(id) {
    return books.find(b => b.id === id);
}

module.exports = { getAllBooks, getBookById };
