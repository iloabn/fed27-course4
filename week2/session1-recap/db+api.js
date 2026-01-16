const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

const client = new MongoClient("mongodb://localhost:27017");

async function connectToDb() {
    await client.connect();
    const db = client.db("counters");
    return db.collection("myCounters");
}

let counters = connectToDb()

app.get('/count/:name', (req, res) => {
    counters.find({ name: req.params.name });
    res.send(data);
});

app.put('/count/:name/:number', (req, res) => {
    counters.insertOne({});
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});