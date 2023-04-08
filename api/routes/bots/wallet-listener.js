var express = require("express");
var router = express.Router();

router.get("/targets", async (req, res, next) => {
    const ipc = req.app.get("ipc");

    const targets = await new Promise((resolve, reject) => {
        ipc.of["wallet-listener"].emit("targets");

        ipc.of["wallet-listener"].on("targets", (data) => {
            resolve(data);
        });
    });

    res.send({targets: targets });
});

router.post("/removeTarget", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    const target = req.body.address;

    const success = await new Promise((resolve, reject) => {
        ipc.of["wallet-listener"].emit("remove-address", {address: target});

        ipc.of["wallet-listener"].on("removed", (data) => {
            resolve(data);
        });
    });

    res.send({success: success });
});

router.post("/addTarget", async (req, res, next) => {
    const ipc = req.app.get("ipc");
    const target = req.body.address;

    const success = await new Promise((resolve, reject) => {
        ipc.of["wallet-listener"].emit("add-address", {address: target});

        ipc.of["wallet-listener"].on("added", (data) => {
            resolve(data);
        });
    });

    res.send({success: success });
});

router.get("/transactions", async (req, res, next) => {
    const ipc = req.app.get("ipc");

    const tx = await new Promise((resolve, reject) => {
        ipc.of["wallet-listener"].emit("transactions");

        ipc.of["wallet-listener"].on("transactions", (data) => {
            resolve(data);
        });
    });

    res.send({transactions: tx });
});

router.post("/removeTransactions", async (req, res, next) => {
    const ipc = req.app.get("ipc");

    const success = await new Promise((resolve, reject) => {
        ipc.of["wallet-listener"].emit("remove-transactions", {hashes: req.body.hashes});

        ipc.of["wallet-listener"].on("removed", (data) => {
            resolve(data);
        });
    });

    res.send({success: success });
});

module.exports = router;