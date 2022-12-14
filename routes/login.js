const express = require("express");

const {
  authenticateUser
} = require("../controllers/AuthenticateUserController");

const router = express.Router();

router.get("/login", (req, res) => {
  console.log(req.cookies);
  res.render("login", {
    message: "",
    displayMessage: false,
    IDsick: "",
    Tel: "",
    TelQuick: "",
    FNamesick: "",
    LNamesick: ""
  });
});

router.post("/login", authenticateUser);

module.exports = router;
