var express = require("express");
var router = express.Router();

router.get("/:name", async (req, res, next) => {
    const config = req.app.get("config");
    const ipc = req.app.get("ipc");

    const startTime = Date.now();
    const botName = req.params.name;
    let bot = config.AVAILABLE_BOTS.find(bot => bot.name === botName);

    const running = config.runningBots.includes(botName);

    if (bot) {
        if(startTime - bot.lastTimePing >= config.BETWEEN_BOTS_PING) {
            const p = new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    ipc.of[bot.ipcServerName].off("pong", handler);
                    bot.ping = 9999;
                    bot.lastTimePing = startTime;
                    req.app.get("saveConfig")();

                    console.log("timeout: " + bot.ping);

                    resolve();
                }, config.BOTS_PING_TIMEOUT);

                const handler = function(data) {
                    bot.ping = Date.now() - startTime;
                    bot.lastTimePing = startTime;
                    ipc.of[bot.ipcServerName].off("pong", handler);
                    console.log("ping: " + bot.ping);

                    clearTimeout(timeout);
    
                    req.app.get("saveConfig")();
                    resolve();
                };

    
                ipc.of[bot.ipcServerName].on("pong", handler);
                ipc.of[bot.ipcServerName].emit("ping", "");
            });

            await p;
        }
        
        res.send({ "running": running, "ping": bot.ping });
    }
    else {
        res.send({ "running": running, "ping": 0 });
    }
});

module.exports = router;