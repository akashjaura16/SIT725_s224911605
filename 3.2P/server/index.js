const express = require("express");
const app = express();
const port = process.env.port || 3000;

// Serve client folder
app.use(express.static("client"));

app.get("/api/books", (req, res) => {
    res.json(require("./data"));
});

app.listen(port, () => {
    console.log("App listening on port: " + port);
});

