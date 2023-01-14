const jwt = require("jsonwebtoken");
const LocalUser = require("../models/LocalUser");
const User = require("../models/User");
const bcrypt = require("bcrypt");
// based on seconds
const maxAge = 50;

const { verifyToken } = require("../utils/verifyToken");

const handleErrors = (errors) => {
  let _errors = { id: "", password: "" };

  //   if (errors.message.includes(`E11000 duplicate key error`)) {
  //     _errors.email = "Email is already taken";
  //     return _errors;
  //   }
  // console.log(errors);
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
  // console.log({ id, password, oldpassword });
  // console.log(typeof parseInt(id));
  const user = await User.findByPk(parseInt(ID));

  if (user) {
    if (opassword == user.Tel || opassword == user.TelQuick) {
      const filter = { id: ID };
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password.toString(), salt);
      const update = { password: password };

      // LocalUser.findOne(filter, async (err, response) => {
      //   if (err) {
      //     const errors = handleErrors(err);
      //     console.log("err1", errors);
      //     return;
      //   } else {
      //     console.log({ response });
      //     if (response) {
      //       LocalUser.updateOne(
      //         filter,
      //         update,
      //         { runValidators: true },
      //         (err) => {
      //           if (err) {
      //             const errors = handleErrors(err);
      //             res.json({
      //               oldpassword: "",
      //               pass: errors.password,
      //               id: errors.id,
      //               success: ""
      //             });
      //             return;
      //           } else {
      //             res.json({
      //               oldpassword: "",
      //               pass: "",
      //               id: "",
      //               success: ".پسورد جدید شما به روز شد"
      //             });
      //             console.log("updated successfully");
      //           }
      //         }
      //       );
      //     } else {
      //       LocalUser.create({ ID, password }, (err) => {
      //         if (err) return;
      //         res.json({
      //           oldpassword: "",
      //           pass: "",
      //           id: "",
      //           success: ".پسورد جدید شما ذخیره شد"
      //         });
      //       });
      //     }
      //   }
      // });

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

      // console.log("old password is incorrect");
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

  // const user = await LocalUser.findById(parseInt(id));
  // console.log({ user });

  // console.log({ id, password, oldpassword });
  // try {
  //   const user = await LocalUser.create({ id, password });
  //   const userId = user._id;
  //   res.status(201).json({ userId });
  // } catch (err) {
  //   const errors = handleErrors(err);
  //   console.log(errors);
  //   res.status(400).json({ errors });
  // }
};

// LocalUser.findOne(id).then(
//   // resolved handler
//   function (doc) {
//     console.log({ doc });
//     const filter = { _id: id };
//     // replace the matched document with the replacement document
//     const replacementDocument = {
//       password: password
//     };
//     const user = LocalUser.replaceOne(filter, replacementDocument);
//     res.status(201).json({ user });
//   },
//   // rejected handler
//   function (err) {
//     try {
//       const user = LocalUser.create({ id, password });
//       // const token = createToken(user._id);
//       // res.cookie("jwt", token, {
//       //   maxAge: maxAge * 1000 * 1000
//       // });
//       const userId = user._id;
//       res.status(201).json({ userId });
//     } catch (err) {
//       const errors = handleErrors(err);
//       console.log(err);
//       res.status(400).json({ errors });
//     }
//   }
// );
