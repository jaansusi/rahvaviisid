var express = require("express");
var app = express();

const port = 3000;

app.get('/', (req : any, res : any, next : any) => {
    res.send('Server running');
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});