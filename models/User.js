const mongoose = require("mongoose");

const User = mongoose.model("User", {
  lastname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

module.exports = User;
