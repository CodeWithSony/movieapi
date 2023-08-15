import { MongoClient } from "mongodb";

const mongoURL = "mongodb://localhost:27017";
const dbName = "moviedata";

export function connectToDatabase() {
  return MongoClient.connect(mongoURL, { useUnifiedTopology: true })
    .then((client) => {
      const db = client.db(dbName);
      console.log("Connected to MongoDB");
      return db;
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
}
