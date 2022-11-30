const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/User");
// const { readImages } = require("../controllers/ReadUserImagesController");

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
          res.locals.userData = null;
          next();
        } else {
          const user = await User.findByPk(decodedToken.id);
          console.log("decodedToken:", decodedToken.id);
          res.locals.userData = { fullname: user.fullname };
          next();
        }
      }
    );
  } else {
    res.locals.userData = null;
    next();
  }
};

module.exports = { handleUserAuth, checkUser };
