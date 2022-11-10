const User = require("../models/User");

module.exports.getUserController = async (req, res) => {
  // findByPK => finding based on primary key
  // const users = await User.findByPk(5462);
  // const users = await User.sum("IDSick");
  // const users = await User.min("IDSick");
  // const users = await User.max("IDSick");
  const users = await User.findOne({ where: { IDSick: 1685 } });
  // users.setDataValue("fullname", "Hossein");
  console.log("A User: ", JSON.stringify(users, null, 2));

  res.json(users);
};
