import express from 'express';
import "dotenv/config";
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "passop";
let app = express();
let port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

client.connect();

// Get all the passwords
app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Save all the passwords
app.post("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.insertOne(password)
    res.send({ success: true, result: findResult });
    // res.send(req.body);
});

// Delete a password
app.delete("/", async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult});
})

app.listen(port, () => {
    console.log(`listining on port http://localhost:${port}`)
})
