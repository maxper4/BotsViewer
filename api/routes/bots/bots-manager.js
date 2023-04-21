var express = require("express");
var router = express.Router();

router.get("/list", async (req, res, next) => {
    const ipc = req.app.get("ipc");

    const list = await new Promise((resolve, reject) => {
        ipc.of["botsManager"].emit("list");

        ipc.of["botsManager"].on("list", (data) => {
            resolve(data);
        });
    });

    res.send({list: list });
});

router.post("/start", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    const botName = req.body.botName;
    const args = req.body.args;

    const answer = await new Promise((resolve, reject) => {
        ipc.of["botsManager"].emit("start", { bot: botName, args: args });

        ipc.of["botsManager"].on("started", (data) => {
            resolve(data);
        });
    });

    res.send(answer);
});

router.post("/stop", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    const botName = req.body.botName;

    const answer = await new Promise((resolve, reject) => {
        ipc.of["botsManager"].emit("stop", { bot: botName});

        ipc.of["botsManager"].on("stopped", (data) => {
            resolve(data);
        });
    });

    res.send(answer);
});

module.exports = router;