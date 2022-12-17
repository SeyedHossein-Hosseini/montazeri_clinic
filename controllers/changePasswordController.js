const jwt = require("jsonwebtoken");
const LocalUser = require("../models/LocalUser");
// based on seconds
const maxAge = 50;

const handleErrors = (errors) => {
  let _errors = { id: "", password: "" };

  //   if (errors.message.includes(`E11000 duplicate key error`)) {
  //     _errors.email = "Email is already taken";
  //     return _errors;
  //   }

  Object.values(errors.errors).forEach(({ properties }) => {
    _errors[properties.path] = properties.message;
  });

  return _errors;
};

module.exports.changePassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await LocalUser.create({ id, password });
    // const token = createToken(user._id);
    // res.cookie("jwt", token, {
    //   maxAge: maxAge * 1000 * 1000
    // });
    const userId = user._id;
    res.status(201).json({ userId });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
