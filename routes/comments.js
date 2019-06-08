const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
})

//Comments Create
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    //add username and it to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    //save comment
                    comment.save();
                    console.log(comment)
                    campground.comments.push(comment)
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

// Comments edit
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        } 
    })
})

// Comment Update
router.put("/:comment_id", (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// Comment Destroy
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
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

module.exports = router;