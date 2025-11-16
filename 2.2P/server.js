// SIT725 - Task 2.2P
// Simple Express Server + /add endpoint

var express = require("express");
var path = require("path");

var app = express();
var port = process.env.port || 4000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Simple home route (loads index.html)
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET /add?x=10&y=5
app.get("/add", function(req, res){
    var x = parseFloat(req.query.x);
    var y = parseFloat(req.query.y);

    if(isNaN(x) || isNaN(y)){
        res.status(400).json({ 
            success: false, 
            message: "Please provide numbers as query parameters, e.g., /add?x=10&y=5" 
        });
        return;
    }

    var result = x + y;

    res.json({
        success: true,
        x: x,
        y: y,
        result: result
    });
});

app.listen(port, function(){
    console.log("App listening to: " + port);
});
