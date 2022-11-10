const { Router } = require("express");

const { getUserController } = require("../controllers/GetUserController");

const router = Router();

router.get("/users", getUserController);

module.exports = router;
