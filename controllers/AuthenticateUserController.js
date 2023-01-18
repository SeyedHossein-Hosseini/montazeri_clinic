const User = require("../models/User");

const LocalUser = require("../models/LocalUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  let data = { time: Date(), id };
  return jwt.sign(data, process.env.SECRET_KEY, {
    // "2 days"
    // "10h"
    // "120" == "120ms"
    expiresIn: 60 * 15
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
    LocalUser.findOne({ id: docNumber }, async function (error, user) {
      if (error) {
        alert("اروری در دیتابیس مونگو رخ داده است");
        console.log(error);
        return;
      } else {
        if (user) {
          bcrypt.compare(password, user.password, (er, result) => {
            if (er) {
            } else {
              if (result) {
                console.log({ result });
                let id = user.id.toString();
                const token = createToken(id);
                res.cookie("MontazeriClinicJWT", token, {
                  // maxAge is in scale of miliseconds
                  // this time is 15 min => 1000 * 60 * 15
                  maxAge: 1000 * 60 * 15
                });
                res.status(200).json({ user });
              } else {
                errors.password = "پسورد شما اشتباه است!!!";
                res.status(400).json({ errors });
                return;
              }
            }
          });
        } else {
          const user = await User.findByPk(docNumber);
          if (user) {
            let pass1 = user.Tel;
            let pass2 = user.TelQuick;
            // remove all characters except numbers
            pass1 = pass1.replace(/\D/g, "");
            pass2 = pass2.replace(/\D/g, "");
            console.log(
              "below output happens in authencticayteUserController -> "
            );
            console.log({ pass1 }, { pass2 });

            if (pass1 == "" && pass2 == "") {
              errors.password =
                "هیچ شماره تماسی از شما در دیتابیس ثبت نشده است!!!";
              res.status(400).json({ errors });
              return;
            }
            if (pass1 == password || pass2 == password) {
              let id = user.IDsick.toString();
              const token = createToken(id);
              res.cookie("MontazeriClinicJWT", token, {
                // maxAge is in scale of miliseconds
                // this time is 15min => 1000 * 60 * 15
                maxAge: 1000 * 60 * 15
              });
              res.status(200).json({ user });
            } else {
              errors.password = " کلمه ی عبور اشتباه است!!!";
              res.status(400).json({ errors });
            }
          } else {
            errors.docNumber = "این شماره پرونده یافت نشد!!!";
            res.status(400).json({ errors });
          }
        }
      }
    });
  } catch (err) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "یک ارور در دریافت داده از دیتابیس رخ داده است!!!" });
    console.log(err);
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("MontazeriClinicJWT", "", {
    maxAge: 1
  });

  res.redirect("/login");
};
