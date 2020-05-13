const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require("./models/User");

const userRoutes = require("./routes/user");
const privateRoutes = require("./routes/private");

app.use(userRoutes);
app.use(privateRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
