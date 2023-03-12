var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    const config = req.app.get("config");

    res.send({ "runningBots": config.runningBots });
});

module.exports = router;