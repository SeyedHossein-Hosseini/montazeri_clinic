const User = require("../models/User");

const jwt = require("jsonwebtoken");

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

module.exports.forgetPasswordController = async (req, res) => {
  let { docNum, pass } = req.body;
  console.log({ docNum, pass });

  const errors = { docNum: "", pass: "" };
  if (docNum == "" || pass == "") {
    if (docNum == "") {
      errors.docNum = "فیلد شماره پرونده را پر کنید";
    }

    if (pass == "") {
      errors.pass = "فیلد کلمه عبور را با شماره تماسی که ثبت کردید، پر کنید";
    }
    res.status(400).json({ errors });
    return;
  }
  try {
    const user = await User.findByPk(docNum);
    if (user) {
      let pass1 = user.Tel;
      let pass2 = user.TelQuick;
      // remove all characters except numbers
      pass1 = pass1.replace(/\D/g, "");
      pass2 = pass2.replace(/\D/g, "");

      console.log(user.Tel === pass1 || user.TelQuick === pass2);

      if (pass1 == "" && pass2 == "") {
        errors.pass = " هیچ شماره تماسی از شما در دیتابیس ثبت نشده است !!!";
        res.status(400).json({ errors });
        return;
      }
      if (pass === pass1 || pass === pass2) {
        console.log("password correct");
        let id = user.IDsick.toString();
        const token = createToken(id);
        res.cookie("MontazeriClinicJWT", token, {
          // maxAge is in scale of miliseconds
          // this time is 1h => 1000 * 60 * 60
          maxAge: 1000 * 60 * 60
        });
        res.status(200).json({ user });
      } else {
        errors.pass = "کلمه ی عبور اشتباه است !!!";
        res.status(400).json({ errors });
      }
    } else {
      errors.docNum = "این شماره پرونده یافت نشد !!!";
      res.status(400).json({ errors });
    }
  } catch (err) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "!!! یک ارور در دریافت داده از دیتابیس رخ داده است" });
    console.log(err);
  }
};
