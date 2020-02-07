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
app.use(express.static("public"));

// Root Route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get the styles routes
app.get("/assets/css/styles.css", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/css/styles.css"));
});

// Get the index.js routes
app.get("/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/js/index.js"));
});

// Get Notes Route
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// GET JSON NOTES ROUTE
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

// POST JSON NOTES ROUTE
app.post("/api/notes", function(req, res) {
  let newNote = req.body;

  fs.readFile(".db/db.json", "utf-8", function(err, data) {
    if (err) throw err;
    dbNotes = JSON.parse(data);

    dbNotes.push(newNote);

    res.json(newNote);
    console.log(data);
  });
});

// DELETE ROUTE
app.delete("/api/notes/:id", function(req, res) {});

// Listen on Port
app.listen(port, function() {
  console.log(`Server is running on ${port}`);
});
