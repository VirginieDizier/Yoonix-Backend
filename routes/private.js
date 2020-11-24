const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const axios = require("axios");
const User = require("../models/User");

const authUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
        console.log("pas d'auth");
      return res.status(401).json({
        error: "Missing Authorization Header",
      });
    }

    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 && parts[0] !== "Bearer") {
      return res.status(401).json({
        error: "Invalid Authorization Header",
      });
    }
    const token = parts[1];

    const payload = jwt.verify(token, process.env.JWT_KEY);

    if (payload.email) {
      next();
    } else {
        console.log("pas d'email");
      res.status(401).json({
        error: {
          message: "Mauvaise authentification.",
        },
      });
    }
  } catch (error) {
      console.log({error});
    res.status(401).json({ error });
  }
};

router.get("/private", authUser, async (req, res) => {
  try {
      res.json(require("../data/users"))
    } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
