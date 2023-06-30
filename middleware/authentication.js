const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    let token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error("Authorization Needed");
    }
    let token_verify = jwt.verify(token, "secret");
    if (!token_verify) {
      throw new Error("Token Invalid");
    }
    req.userId = token_verify.id;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = authentication;
