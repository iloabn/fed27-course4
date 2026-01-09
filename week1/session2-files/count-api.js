const express = require('express');
const app = express();

const port = 3000;

let ourCounters = [];

app.get('/count/:name', (req, res) => {
    let selectedCounter = ourCounters.find(
        counter => counter.name === req.params.name
    );

    if (selectedCounter) {
        res.send(selectedCounter.value);
    } else {
        res.status(404)
            .send(`Sorry, I couldn't find ${req.params.name} 😶‍🌫️`);
    }
});

app.put('/count/:name/:number', (req, res) => {

    const existingCounter = ourCounters.find(c => c.name === req.params.name);
    if (existingCounter) {
        existingCounter.value = req.params.number;
        res.sendStatus(214);
    } else {
        ourCounters.push({
            name: req.params.name,
            value: req.params.number
        });
        res.sendStatus(201);
    }

});

app.listen(port, () => {
    console.log("Listening on port " + port);
});