const { Router } = require("express");

const { authenticateUser } = require("../controllers/AuthenticateUserController");

const router = Router();

router.get("/users", authenticateUser);

module.exports = router;
