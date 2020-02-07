var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root Route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/assets/index.html"));
});

// Get Notes Route
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/assets/notes.html"));
});

// GET JSON NOTES ROUTE
app.get("/api/notes", function(req, res) {
  fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    // return res.json(notes);
    console.log(notes);
  });
});

// POST JSON NOTES ROUTE

// Listen on Port
app.listen(port, function() {
  console.log(`Server is running on ${port}`);
});
