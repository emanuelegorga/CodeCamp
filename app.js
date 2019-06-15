const   express        = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        flash          = require("connect-flash"),
        passport       = require("passport"),
        LocalStrategy  = require("passport-local"),
        methodOverride = require("method-override"),
        Campground     = require("./models/campground"),
        Comment        = require("./models/comment"),
        User           = require("./models/user"),
        seedDB         = require("./seeds"),
        PORT           = process.env.PORT || 3000,
        session        = require("express-session"),
        MongoStore     = require("connect-mongo")(session);

//requiring routes
const commentRoutes     = require("./routes/comments"),
      campgroundRoutes  = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, { 
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to DB');
}).catch(err => {
  console.log('Error: ', err.message)
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); seed the database

// app.use(require("express-session")({
//     secret: "Codecamp is a great project",
//     resave: false,
//     saveUninitialized: false
// }));

// PASSPORT CONFIGURATION
app.use(session({
  secret: 'testing secret session',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(PORT, process.env.IP, () => {
  console.log(`The CodeCamp Server Has Started on port ${PORT}` );
});
