const express = require('express');

const router = express.Router();

router.get("/changePassword", (req, res) => {
    res.render('changePassword');
})

module.exports = router;