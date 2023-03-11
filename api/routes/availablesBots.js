var express = require("express");
var router = express.Router();
const config = require("../config");

router.get("/", function(req, res, next) {
    res.send({ "availableBots": config.AVAILABLE_BOTS });
});

module.exports = router;