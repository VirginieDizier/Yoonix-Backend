const jwt = require("jsonwebtoken");

/* const signIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || users[email] !== password) {
    return res.status(401).json({
      error: {
        message: "User doesn't exist.",
      },
    });
  }

  const token = jwt.sign({ username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);

  res
    .cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
    .json({ message: "vous êtes connecté." });
}; */

/* const welcome = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }

    return res.status(400).end();
  }

  res.send(`Welcome ${payload.username}!`);
};

const refresh = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }

  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end();
  }

  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
};

module.exports = {
  welcome,
  refresh,
}; */
