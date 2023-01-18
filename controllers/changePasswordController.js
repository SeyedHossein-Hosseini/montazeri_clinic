const jwt = require("jsonwebtoken");
const LocalUser = require("../models/LocalUser");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { verifyToken } = require("../utils/verifyToken");

const handleErrors = (errors) => {
  let _errors = { id: "", password: "" };

  Object.values(errors.errors).forEach(({ properties }) => {
    _errors[properties.path] = properties.message;
  });

  return _errors;
};

module.exports.changePassword = async (req, res) => {
  const ID = await verifyToken(req);
  console.log({ ID });

  if (!ID) res.redirect("/login");

  let { password, opassword } = req.body;

  if (password.length < 6) {
    res.json({
      oldpassword: "",
      pass: "پسورد جدید شما باید بیش از 6 رقم داشته باشد",
      id: "",
      success: ""
    });
    return;
  }

  const user = await User.findByPk(parseInt(ID));

  let tel = user.Tel;
  let telquick = user.TelQuick;
  // remove all characters except numbers
  tel = tel.replace(/\D/g, "");
  telquick = telquick.replace(/\D/g, "");

  if (user) {
    if (opassword == tel || opassword == telquick) {
      const filter = { id: ID };
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password.toString(), salt);
      const update = { password: password };

      LocalUser.findOneAndUpdate(
        filter,
        update,
        { runValidators: true, upsert: true },
        function (error, result) {
          if (error) {
            const errors = handleErrors(error);
            res.json({
              oldpassword: "",
              pass: errors.password,
              id: errors.id,
              success: ""
            });
            return;
          } else {
            res.json({
              oldpassword: "",
              pass: "",
              id: "",
              success: ".پسورد جدید شما به روز شد"
            });
            console.log({ result });
          }
        }
      );
    } else {
      res.json({
        oldpassword: "!!! پسورد قدیمی شما اشتباه است ",
        pass: "",
        id: "",
        success: ""
      });
      return;
    }
  } else {
    res.json({
      id: " !!! فردی با این شماره ی پرونده یافت نشد",
      pass: "",
      oldpassword: "",
      success: ""
    });
    return;
  }
};
