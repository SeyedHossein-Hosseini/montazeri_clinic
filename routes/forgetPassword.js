const { Router } = require("express");
const {
  forgetPasswordController
} = require("../controllers/forgetPasswordController");
const router = Router();

router.get("/forget-password", (req, res) => {
  res.render("forgetPassword", {});
});

router.post("/forget-password", forgetPasswordController);

module.exports = router;
