const express = require("express"),
    http = require("http"),
    path = require("path"),
    config = require("./config"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    errorHandler = require("errorhandler");

const app = express();
const PORT = process.env.PORT || config.get("port");

app.set("port", PORT);

if (app.get("env") === "development") {
  app.use(logger("dev"));
} else {
  app.use(logger("default"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

require("./routes/index")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// error handler
app.use(function(err, req, res, next) {
  if (app.get("env") === "development") {
    app.use(errorHandler());
  } else {
    res.send(500);
  }
});

http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
