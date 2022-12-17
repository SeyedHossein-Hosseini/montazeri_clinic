const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const { isStrongPassword } = require("validator");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "لطفا شماره پرونده خود را وارد کنید"],
  },
  password: {
    type: String,
    required: [true, "لطفا پسورد خود را وارد کنید"],
    minLength: [6, `پسورد شما شامل حداقل 6 کلمه باشد`],
    // validate: [
    //   isStrongPassword,
    //   "Use symbols, capital letters, small letters and numbers in your password !!!"
    // ]
  }
});

// fire a function after an instance is saved to the database
// userSchema.post('save', function (doc, next) {
//   console.log("Doc:", doc);
//   next();
// });

// fire a function before an instance saved to the database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password.toString(), salt);
  next();
});

// static method for login
// userSchema.statics.login = async function (email, password) {
//   // find a user based on an email
//   const user = await User.findOne({ email });
//   if (user) {
//     // compare input password by user and the password saved in the DB
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('Password is incorrect');
//   }
//   throw Error('This user not exists');
// }

const LocalUser = mongoose.model("user", userSchema);

module.exports = LocalUser;
