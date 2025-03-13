const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const sessionPool = require('pg').Pool;
const logger = require("morgan");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

var indexRouter = require("./routes/index");

// session stuff

const { 
  PORT = 3000,
  NODE_ENV = 'development',

  SESS_NAME = 'sid',
  SESS_SECRET = 'asdasdadasdasd',
  SESS_LIFETIME = 1000*60 * 60 * 2
} = process.env

const users = [
  { id: 1, name: 'Alex', password: 'secret'},
  { id: 2, name: 'Bob', password: 'secret'},
  { id: 3, name: 'Linda', password: 'secret'}

]

const DB_USER = 'karl'
const DB_PASS = 'Karl 0305'
const DB_HOST = 'locahost'
const DB_PORT = 5432
const DB_NAME = 'pixelDb'


const sessionDBaccess = new sessionPool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME
})



// liveReload remove when fininshed 
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// express stuff idk
var app = express();

app.use(connectLiveReload());

//session stuff



app.use(session({
    store: new pgSession({
      pool: sessionDBaccess,
      tableName: 'session'
    }),
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: false
    }
  }))






// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;