var express = require("express");
// Sets up the Express App
// =============================================================
var app = express();
// This will open on any port when pushed to heroku or port 3000 when on local host
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// This is needed for static files such as css or js and pulling in images
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listen on Port
app.listen(PORT, function() {
  console.log(`Server is running on ${PORT}`);
});
