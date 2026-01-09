const express = require('express');
const fs = require('node:fs');

const app = express();

const port = 3000;

app.get('/count/:name', (req, res) => {
    const data = fs.readFileSync(req.params.name + ".🧮");
    res.send(data);
});

app.put('/count/:name/:number', (req, res) => {
    fs.writeFile(
        req.params.name + ".🧮",
        req.params.number,
        () => { }
    );
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});