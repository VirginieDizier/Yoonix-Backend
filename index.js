const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/yoonix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require("./models/User");

const userRoutes = require("./routes/user");

app.use(userRoutes);

app.listen(4000, () => {
  console.log("Server has started");
});
