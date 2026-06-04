require("dotenv").config();
const { MongoClient } = require("mongodb");

const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.DB_NAME || "recipesDb";

let client;
let database;

async function connectToDb() {
  if (database) {
    return database;
  }

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  client = new MongoClient(mongoUri);
  await client.connect();

  database = client.db(databaseName);
  console.log(`Connected to MongoDB database: ${database.databaseName}`);

  return database;
}

function getDb() {
  if (!database) {
    throw new Error("Database not initialized. Call connectToDb() first.");
  }

  return database;
}

module.exports = { connectToDb, getDb };