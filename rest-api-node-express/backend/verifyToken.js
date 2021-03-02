const config = require('./config');
const path = require('path');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  var token = req.headers["x-json-web-token"];
  if (!token) {
    res.status(403).sendFile(path.join(__dirname + "/unverified.html"));
    console.log("No token was provided");
  } else {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        res.status(500).sendFile(path.join(__dirname + "/unverified.html"));
        console.log("Failure to verify the token");
      } else {
          req.token = token;
          req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = verifyToken;
