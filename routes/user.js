const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;
const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS;

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

// SIGN_UP

router.post("/user/sign_up", async (req, res) => {
  try {
    const { lastname, firstname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        lastname,
        firstname,
        email,
        password,
      });
      await newUser.save();
      res.json(newUser);
    } else {
      res.status(401).json({
        error: {
          message: "cet utilisateur existe déjà",
        },
      });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
});

// SIGN_IN
router.post("/user/sign_in", (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email, password });
  if (!email || !password || !user) {
    return res.status(401).json({
      error: {
        message: "User doesn't exist.",
      },
    });
  }
  const token = jwt.sign({ email }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);

  res
    /* .cookie("token", token, { maxAge: jwtExpirySeconds * 1000 }) */
    .json({
      message: "vous êtes connecté.",
      token,
      maxAge: jwtExpirySeconds * 1000,
    });
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
