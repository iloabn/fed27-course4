const express = require('express');
const app = express();

let currentCount = 0;

app.get('/', (req, res) => {

    res.status(202);

    res.send("");
});

app.get('/count', (req, res) => {
    res.send(`Count: ${currentCount}`);
});

app.patch('/count', (req, res) => {
    currentCount += 1;
    res.status(202)
        .send(currentCount);
});

app.listen(5001, () => {
    console.log("Listening...");
});