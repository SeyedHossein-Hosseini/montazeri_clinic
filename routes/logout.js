const { Router } = require("express");
const { logout_get } = require("../controllers/AuthenticateUserController");

const router = Router();

router.get("/logout", logout_get);

module.exports = router;
