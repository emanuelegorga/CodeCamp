const   express    = require("express"),
        app        = express(),
        bodyParser = require("body-parser"),
        mongoose   = require("mongoose"),
        Campground = require("./models/campground"),
        seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost:27017/codecamp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name, image: image, description: description}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id", (req, res) => {
    // Find campgroud with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground)
            // render show template with that campground 
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// =================
// COMMENTS ROUTES
// =================

app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.listen(3000, function() {
  console.log("The CodeCamp Server Has Started!");
});
