const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
});

module.exports = User;
