const express = require("express");

const app = express();

app.use(express.json());

const buttonData = ["red", "green", "red"];

app.get("/api/buttons/data", function (req, res) {
    res.status(200).json(buttonData);
});

app.post("/api/buttons/data/new", function (req, res) {
    buttonData.push(req.body.value);
    res.status(200).json(buttonData);
});

module.exports = app;