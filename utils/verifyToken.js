const jsonwebtoken = require("jsonwebtoken");

module.exports.verifyToken = async (req) => {
  const token = await req.cookies.MontazeriClinicJWT;
  var tokenID = "";
  if (token) {
    jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log("an error accured");
        return 0;
      } else {
        console.log("decodedToken:", decodedToken.id);
        tokenID = decodedToken.id;
      }
    });
  } else {
    tokenID = "0";
  }

  return tokenID;
};
