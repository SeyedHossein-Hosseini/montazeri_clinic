const express = require("express");
const { changePassword } = require("../controllers/changePasswordController");

const router = express.Router();

router.get("/changePassword", (req, res) => {
  res.render("changePassword");
});

router.post("/changePassword", changePassword);

module.exports = router;
