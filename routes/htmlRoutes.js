var path = require("path");

module.exports = function(app) {
  // Root Route
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Get Notes page Route
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Get the styles routes
  app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "./assets/css/styles.css"));
  });

  // Get the index.js routes
  app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "./assets/js/index.js"));
  });
};
