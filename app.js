const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

let campgrounds = [
    { name: "JavaScript", image: "https://image.freepik.com/free-icon/js-rounded-square_318-10133.jpg" },
    { name: "Node", image: "https://ih1.redbubble.net/image.109336634.1604/flat,550x550,075,f.u1.jpg" },
    { name: "React", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4AuEQCCvVDUk_LhSstNzOBzrxvUcExKex6nZUgBMdeLyTNzr3" }
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(3000, function() {
  console.log("The CodeCamp Server Has Started!");
});
