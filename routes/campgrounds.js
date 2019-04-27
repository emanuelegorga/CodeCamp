const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// index route
router.get("/", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// create route
router.post("/", (req, res) => {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = { name: name, image: image, description: description }
    // Create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// new route
router.get("/new", (req, res) => {
    res.render("campgrounds/new.ejs");
});

// show route
router.get("/:id", (req, res) => {
    // Find campgroud with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground)
            // render show template with that campground 
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})

module.exports = router;