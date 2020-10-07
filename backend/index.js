var express = require("express");
var app = express();

const port = 3000;

app.get("/", (req, res, next) => {
    res.json({ 'value': 'Test' });
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});