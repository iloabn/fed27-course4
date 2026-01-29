const express = require("express");
const app = express();
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");

const Ilo = new MongoClient("mongodb://localhost:27017");

const connect = () => {
    const db = Ilo.db("topics");
    const topicsCollection = db.collection("topics");
    return topicsCollection;
};

const PORT = 3003;

app.post("/api/topics", (req, res) => {
    const topics = connect();

    const data = { title: req.body.title, vote: 0 };

    if (!data.title) {
        res.sendStatus(406);
    } else {
        console.log("yay!");
        topics.insertOne(data);
        res.json(data);
    }
});

app.get("/api/topics", (req, res) => {

});
app.get("/api/topics/:id", (req, res) => {

});

app.post("/api/topics/:id/vote", (req, res) => {
    const id = req.params.id;
    const topics = connect();

    topics.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { vote: 1 } }
    );

    res.sendStatus(202);
});

app.patch("/api/topics/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});