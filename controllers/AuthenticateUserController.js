const User = require("../models/User");

const jwt = require("jsonwebtoken");

// based on seconds
const maxAge = 50;

const createToken = (id) => {
  let data = { time: Date(), userId: id };
  return jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: maxAge * 100
  });
};

module.exports.authenticateUser = async (req, res) => {
  const { docNumber, password } = req.body;

  const errors = { docNumber: "", password: "" };

  if (docNumber == "" || password == "") {
    if (docNumber == "") {
      errors.docNumber = "Empty Doc number";
    }

    if (password == "") {
      errors.password = "Empty password";
    }
    res.status(400).json({ errors });
    return;
  }

  try {
    const user = await User.findByPk(docNumber);
    if (user) {
      let pass1 = user.Tel;
      let pass2 = user.TelQuick;
      // remove all characters except numbers
      pass1 = pass1.replace(/\D/g, "");
      pass2 = pass2.replace(/\D/g, "");
      console.log(pass1, pass2);

      if (pass1 == "" && pass2 == "") {
        errors.password = "There is no telephone number in database";
        res.status(400).json({ errors });
        return;
      }
      if (user.Tel == password || user.TelQuick == password) {
        const token = createToken(user.docNumber);
        res.cookie("MontazeriClinicJWT", token, {
          maxAge: maxAge * 1000 * 1000
        });
        res.status(200).json({ user });
      } else {
        errors.password = "Incorrect password";
        res.status(400).json({ errors });
      }
    } else {
      errors.docNumber = "Not found any user with this dov number";
      res.status(400).json({ errors });
    }
  } catch (err) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "An error happened in fetching data to database" });
    console.log(err);
  }
  // console.log(user.IDsick);

  // console.log(user.FNamesick);
  // console.log(user.LNamesick);
  // const users = await User.sum("IDSick");
  // const users = await User.min("IDSick");
  // const users = await User.max("IDSick");
  // const users = await User.findOne({ where: { IDSick: 1685 } });
  // users.setDataValue("fullname", "Hossein");
  // console.log("A User: ", JSON.stringify(users, null, 2));

  // res.json(users);
};

module.exports.logout_get = (req, res) => {
  res.cookie("MontazeriClinicJWT", "", {
    maxAge: 1
  });

  res.redirect("/login");
};
