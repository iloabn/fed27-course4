const express = require("express");
const app = express();
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

const connect = () => {
    const db = client.db("topics");
    const topicsCollection = db.collection("topics");
    return topicsCollection;
};

const PORT = 3009;

app.post("/api/topics", async (req, res) => {
    const topics = connect();

    const data = {
        title: req.body.title,
        vote: 0
    };

    if (!data.title) {
        res.sendStatus(406);
    }

    const existingTopic = await topics.findOne({
        title: data.title
    });

    if (existingTopic) {
        res.status(302).send(
            `This topic already exists! It has the id ${existingTopic._id}`
        );
    }

    console.log("yay!");
    topics.insertOne(data);
    res.json(data);
});

app.get("/api/topics", async (req, res) => {
    const topics = connect();

    const foundTopic = await topics.find();
    res.json(await foundTopic.toArray());
});

app.get("/api/topics/leaderboard", async (req, res) => {
    const topics = connect();
    const topTopics = await topics.aggregate([{
        $sort: { vote: -1 }
    },
    {
        $limit: 3
    }
    ]);

    res.json(await topTopics.toArray());
});

// /api/topics/leaderboard
app.get("/api/topics/:id", async (req, res) => {
    const id = req.params.id;
    const topics = connect();

    if (!ObjectId.isValid(id)) { // id = "Lego"
        res.sendStatus(400);
    } else {
        const foundTopic = await topics.findOne(
            { _id: new ObjectId(id) }
        );
        res.json(foundTopic);
    }
});

app.post("/api/topics/:id/vote", (req, res) => {
    const id = req.params.id;
    const topics = connect();

    if (!ObjectId.isValid(id)) { // id = "Lego"
        res.sendStatus(400);
    } else {
        topics.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { vote: 1 } }
        );
    }

    res.sendStatus(202);
});

app.patch("/api/topics/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});