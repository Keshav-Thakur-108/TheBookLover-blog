var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var Blog = require("./models/blog.js");
var Comment = require("./models/comment");
var User = require("./models/User.js");
var expressSanitizer = require("express-sanitizer");

app.use(expressSanitizer());
app.use(express.static("public"));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb://localhost/litBlog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var campgroundRoutes = require("./Routers/blogs");
var commentRoutes = require("./Routers/comment");
var indexRoutes = require("./Routers/index");

app.use(
  require("express-session")({
    secret: "Shir Ram is the greatest",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());



var initPassport = require('./passport/init');
initPassport(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.moment = moment;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(3000, function (req, res) {
  console.log("The server is started");
});
