const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = { name: name, price: price, image: image, description: description, author: author }
    // Create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated)
            res.redirect("/campgrounds");
        }
    });
});

// new route
router.get("/new", middleware.isLoggedIn, (req, res) => {
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

// edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// update route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            res.redirecet("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find the correct campground
    Campground.findByIdAndRemove(req.params.id, (err, deletedCampground) => {
        if(err) {
            res.redirect("/campgrounds");
        }
        Comment.deleteMany({ _id: { $in: deletedCampground.comments } }, (err) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        });
    })
});

module.exports = router;
