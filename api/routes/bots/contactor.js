var express = require("express");
var router = express.Router();

router.get("/contacts", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    
    const contacts = await new Promise((resolve, reject) => {
        ipc.of.contactor.emit("getContacts");

        ipc.of.contactor.on("contacts", (data) => {
            resolve(data);
        });
    });

    res.send({contacts: contacts });
});

router.post("/removeContact", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    const contact = req.body.contact;

    const success = await new Promise((resolve, reject) => {
        ipc.of.contactor.emit("removeContact", contact);

        ipc.of.contactor.on("contactRemoved", (data) => {
            resolve(data);
        });
    });

    res.send({success: success });
});

router.post("/addContact", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    const nickname = req.body.nickname;
    const discordId = req.body.discordId;
    const permissions = req.body.permissions;

    const success = await new Promise((resolve, reject) => {
        ipc.of.contactor.emit("addContact", {nickname: nickname, discordId: discordId, permissions: permissions});

        ipc.of.contactor.on("contactAdded", (data) => {
            resolve(data);
        });
    });

    res.send({success: success });
});

module.exports = router;