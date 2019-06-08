const Campground = require("../models/campground");
const Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) { 
    // is user logged in
    if (req.isAuthenticated()) {
        // find the correct campground
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("back");
            } else {
                // does the user own the campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        })
    } else {
        //if not, redirect
        console.log("You need to be logged in!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) { 
    // is user logged in
    if (req.isAuthenticated()) {
        // find the correct campground
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                // does the user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        })
    } else {
        //if not, redirect
        console.log("You need to be logged in!")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middlewareObj;
