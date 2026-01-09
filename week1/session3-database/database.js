const { MongoClient } = require('mongodb');

const client = new MongoClient("mongodb://localhost:27017");

async function testDatabase() {

    await client.connect();
    console.log("We are now connected");

    const db = client.db("clothesshop");
    const clothes = db.collection("clothes");

    console.log("Adding a blue cape");
    await clothes.insertOne({
        color: "blue",
        name: "Cape",
        size: "universal",
        inStock: 100
    });

    const count = await clothes.countDocuments();
    console.log(`We have: ${count} clothes in our database`);

    const all = await clothes.find({
        color: {
            $regex: /^b.*/ // With this, we find all colors that start with b
        }
    });
    const allResult = await all.toArray();
    console.log(allResult);

    await client.close();
    console.log("Done!");
}

testDatabase();