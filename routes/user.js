const express = require("express");
const router = express.Router();

const User = require("../models/User");

// READ

router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// CREATE

router.post("/user/create", async (req, res) => {
  try {
    const newUser = new User({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE

// router.post("/delete", async (req, res) => {
//   try {
//     const userToDelete = await User.findById(req.body.id);
//     if (userToDelete) {
//       userToDelete.remove();
//       res.json({ message: "User Deleted" });
//     } else {
//       res.json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });

module.exports = router;
