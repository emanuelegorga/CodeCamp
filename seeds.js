const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
    name: "Python CodeCamp",
    image: "https://cdn.auth0.com/blog/python-restful/logo.png",
    description: "This is a great CodeCamp to enjoy nature and learn more about Python"
    },
    {
    name: "Ruby CodeCamp",
    image: "https://dzkuxpo8tx7lr.cloudfront.net/assets/Ruby-Logo-b25e5a986d102dadfcffd767c8eab13cfaac71e711fee01bced92f777f784623.png",
    description: "This is a great CodeCamp to enjoy nature and learn more about Ruby"
    },
    {
    name: "JavaScript CodeCamp",
    image: "https://cdn.auth0.com/blog/es6rundown/logo.png",
    description: "This is a great CodeCamp to enjoy nature and learn more about JavaScript"
    }
]

function seedDB(){
    // Remove all Campgrounds
    Campground.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campground
        data.forEach(seed => {
            Campground.create(seed, (err, campground) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("added campground:)")
                    // create a comment
                    Comment.create({
                        text: "This place is great!",
                        author: "Young coder"
                    }, (err, comment) => {
                        if(err) {
                            console.log(err)
                        } else {
                            campground.comments.push(comment)
                            campground.save()
                            console.log("added new comment to campground")
                        }
                    })
                }
            })
        })
    });
}

module.exports = seedDB;