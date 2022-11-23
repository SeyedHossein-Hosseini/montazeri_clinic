const User = require("../models/User");

const jwt = require("jsonwebtoken");

// based on seconds
const maxAge = 30;

const createToken = (id) => {
  let data = { time: Date(), id };
  return jwt.sign(data, process.env.SECRET_KEY, {
    // "2 days"
    // "10h"
    // "120" == "120ms"
    expiresIn: "1h"
    // 1 hour of expiration => expiresIn: 60 * 60
    // exp: Math.floor(Date.now() / 1000) + 60 * 60
  });
};

module.exports.authenticateUser = async (req, res) => {
  const { docNumber, password } = req.body;

  const errors = { docNumber: "", password: "" };

  if (docNumber == "" || password == "") {
    if (docNumber == "") {
      errors.docNumber = "فیلد شماره پرونده را پر کنید";
    }

    if (password == "") {
      errors.password =
        "فیلد کلمه عبور را با شماره تماسی که ثبت کردید، پر کنید";
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
        errors.password = "!!! هیچ شماره تماسی از شما در دیتابیس ثبت نشده است ";
        res.status(400).json({ errors });
        return;
      }
      if (user.Tel == password || user.TelQuick == password) {
        let id = user.IDsick.toString();
        const token = createToken(id);
        res.cookie("MontazeriClinicJWT", token, {
          // maxAge is in scale of miliseconds
          // this time is 1h => 1000 * 60 * 60
          maxAge: 1000 * 60 * 60
        });
        res.status(200).json({ user });
      } else {
        errors.password = "!!! کلمه ی عبور اشتباه است";
        res.status(400).json({ errors });
      }
    } else {
      errors.docNumber = "!!! این شماره پرونده یافت نشد ";
      res.status(400).json({ errors });
    }
  } catch (err) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "!!! یک ارور در دریافت داده از دیتابیس رخ داده است" });
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
