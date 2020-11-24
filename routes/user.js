const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;

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
      const token = jwt.sign({ lastname, firstname, email }, jwtKey);
      res.json({ token, user: newUser });
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
  if (!email || !password ) {
      return res.status(401).json({
          error: {
              message: "Ce compte n'existe pas.",
            },
        });
    }

const user = User.findOne({ email, password });
if(!user){
    return res.status(401).json({
        error: {
            message: "Ce compte n'existe pas.",
          },
      });
}

  const token = jwt.sign(
    { email, firstname: user.firstname, lastname: user.lastname },
    jwtKey
  );

  res.json({
    message: "vous êtes connecté.",
    token,
  });
});

module.exports = router;
