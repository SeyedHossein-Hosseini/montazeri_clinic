const express = require("express");

const router = express.Router();

router.get("/main", (req, res) => {
  res.render("mainPage", {
    fname: "",
    lname: "",
    id_sick: "",
  });
});

module.exports = router;
