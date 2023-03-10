var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    const config = req.app.get("config");

    res.send({ "availableBots": config.AVAILABLE_BOTS.map(bot => bot.name) });
});

module.exports = router;