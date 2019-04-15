const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This will be soon the landing page!");
});

app.listen(3000, function() {
  console.log("The CodeCamp Server Has Started!");
});
