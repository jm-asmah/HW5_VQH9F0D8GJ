// With Mongo CLient

const express = require("express");
const app = express();
const port = 4000;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// const base =
//   "mongodb+srv://jm-asmah_1:14156654@cluster0.xef2u.mongodb.net/jamesdatavase";
const base =
  "mongodb+srv://jm-asmah_1:14156653@cluster0.xef2u.mongodb.net/jamesdatavase";

// DB Name
const dbName = "jamesdatavase";

// Creating new MongoClient
const client = new MongoClient(base);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/corona", (req, res) => {
  // Stating the constants needed
  const db = client.db(dbName);
  const collection = db.collection("covid");

  // Finding all the cases
  collection.find({}).toArray(async function (err, cases_list) {
    assert.equal(err, null);
    let cases = await cases_list;
    res.render("index.ejs", { stories: cases });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connecting to server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("====================================");
  console.log("Connected successfully to DB");
  console.log("====================================");

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
