const express = require("express");
const app = express();
app.use(express.json());

const { MongoClient } = require("mongodb");

const Ilo = new MongoClient("mongodb://localhost:27017");

const connect = () => {
    const db = Ilo.db("topics");
    const topicsCollection = db.collection("topics");
    return topicsCollection;
};

const PORT = 3003;

app.post("/api/topics", (req, res) => {
    const topics = connect();

    console.log("Someone sent: " + req.body)
    const data = { title: req.body.title, vote: 0 };
    if (!data.title) {
        res.sendStatus(406);
    } else {
        console.log("yay!");
        topics.insertOne(data);
        res.send(data)
    }
});

app.get("/api/topics", (req, res) => {

});
app.get("/api/topics/:id", (req, res) => {

});

app.post("/api/topics/:id/vote", (req, res) => {

});

app.patch("/api/topics/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});