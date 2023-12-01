import { connectDB } from "@/util/database.js";
const { MongoClient } = require('mongodb');

export default async function Home() {

  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  return (
    <div>{result[0].title}</div>
  )
}
