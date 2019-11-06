const express = require("express"),
    http = require("http"),
    path = require("path"),
    config = require("./config"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    errorHandler = require("errorhandler");

const app = express();
const PORT = config.get("port");

const indexRouter = require("./routes/");

app.set("port", PORT);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (app.get("env") === "development") {
  app.use(logger("dev"));
} else {
  app.use(logger("default"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  if (app.get("env") === "development") {
    app.use(errorHandler());
  } else {
    res.send(500);
  }
});

app.get("*", (req, res) => {
  res.send("<h1>Error 404!! Sorry, Page Not Found</h1>");
});

http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
