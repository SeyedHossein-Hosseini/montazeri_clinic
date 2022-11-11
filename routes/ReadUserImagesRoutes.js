const { Router } = require("express");

const { readImages } = require("../controllers/ReadUserImagesController");

const router = Router();

router.get("/readimage", readImages);

module.exports = router;
