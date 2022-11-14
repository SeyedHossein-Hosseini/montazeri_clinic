const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/User");

// checks if a user has a valid token
const handleUserAuth = (req, res, next) => {
  const token = req.cookies.MontazeriClinicJWT;
  if (token) {
    jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// checks the current user status and information
const checkUser = (req, res, next) => {
  const token = req.cookies.MontazeriClinicJWT;
  if (token) {
    jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          // get images here
          // const user = await User.findById(decodedToken.userId);
          res.locals.user =
            "This is the authenticated user and can upload images";
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { handleUserAuth, checkUser };
