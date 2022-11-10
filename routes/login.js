const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", {
    message: "",
    displayMessage: false,
    IDsick: "",
    Tel: "",
    TelQuick: "",
    FNamesick: "",
    LNamesick: "",
  });
});

module.exports = router;
