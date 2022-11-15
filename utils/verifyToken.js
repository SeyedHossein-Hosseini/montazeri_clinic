const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

module.exports.verifyToken = async () => {
  const token = await req.cookies.MontazeriClinicJWT;
  if (token) {
    jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY,
      async (err, decodedToken) => {
        if (err) {
          return "";
        } else {
          console.log("decodedToken:", decodedToken.id);
          return decodedToken.id;
        }
      }
    );
  } else {
    return "";
  }
};
