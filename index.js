const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

mongoose.connect("mongodb://localhost/yoonix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require("./models/User");

const userRoutes = require("./routes/user");
const privateRoutes = require("./routes/private");

app.use(userRoutes);
app.use(privateRoutes);

/* const { welcome, refresh } = require("./routes/handlers");

app.get("/welcome", welcome);
app.post("/refresh", refresh); */

app.listen(4000, () => {
  console.log("Server has started");
});
