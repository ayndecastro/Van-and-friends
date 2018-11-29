require("dotenv").config();
var express = require("express");
// var exphbs = require("express-handlebars");
// const mongoose = require('mongoose');
const path = require("path")

var db = require("./models/index");


var app = express();
var PORT = 3000 || process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/")));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/userRoutes");

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
