const User = require("../models/User");

module.exports.authenticateUser = async (req, res) => {
  const {docNumber, password} = req.body;
  
  if(docNumber == '') {
    console.log();
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
