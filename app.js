const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  let campgrounds = [
    {
      name: "JavaScript",
      image:
        "https://image.freepik.com/free-icon/js-rounded-square_318-10133.jpg"
    },
    {
      name: "Node",
      image:
        "https://ih1.redbubble.net/image.109336634.1604/flat,550x550,075,f.u1.jpg"
    },
    {
      name: "React",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4AuEQCCvVDUk_LhSstNzOBzrxvUcExKex6nZUgBMdeLyTNzr3"
    }
  ];

  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(3000, function() {
  console.log("The CodeCamp Server Has Started!");
});
