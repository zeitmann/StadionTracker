import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

const client = new MongoClient(MONGODB_URI);
await client.connect();
const db = client.db('stadiontracker');

export default db;