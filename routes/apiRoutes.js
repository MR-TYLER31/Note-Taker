const db = require("../db/db.json");
var fs = require("fs");
const uuid = require("uuid/v4");

module.exports = function(app) {
  // GET JSON NOTES ROUTE
  app.get("/api/notes", function(req, res) {
    res.send(db);
  });

  // POST JSON NOTES ROUTE
  app.post("/api/notes", function(req, res) {
    // Create a unique identifier for each note. Each note created will have its own ID by using UUID NPM
    let noteId = uuid();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const dbNotes = JSON.parse(data);

      dbNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(dbNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note created!");
      });
    });
  });

  // DELETE ROUTE
  app.delete("/api/notes/:id", function(req, res) {
    // stores the params ID in a variable
    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const dbNotes = JSON.parse(data);
      const newDB = dbNotes.filter(function(note) {
        note.id !== noteId;
      });

      fs.writeFile("./db/db.json", JSON.stringify(newDB, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note deleted");
      });
    });
  });
};
