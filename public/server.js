var express = require("express");
var path = require("path");
var fs = require("fs");
const uuid = require("uuid/v4");
const db = require("../db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
// This will open on any port when pushed to heroku or port 3000 when on local host
var port = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// This is needed for static files such as css and pulling in images
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
  let noteId = uuid();
  let newNote = {
    id: noteId,
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile("../db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const dbNotes = JSON.parse(data);

    dbNotes.push(newNote);

    fs.writeFile("../db/db.json", JSON.stringify(dbNotes, null, 2), err => {
      if (err) throw err;
      res.send(db);
      console.log("Note created!");
    });
  });
});

// DELETE ROUTE
app.delete("/api/notes/:id", function(req, res) {});

// Listen on Port
app.listen(port, function() {
  console.log(`Server is running on ${port}`);
});
