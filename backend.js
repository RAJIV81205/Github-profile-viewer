import { MongoClient } from "mongodb";
import { user } from "./frontend.js";

const url = "mongodb+srv://kenma:3g4bfi348fbs@nodejs.1yost.mongodb.net/";

const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("GithubPastViewers");

  data = {
    id: user.login,
    avatar: user.avatar_url,
    name: user.name,
    followers: user.followers,
    following: user.following,
    repos: user.public_repos,
  };

  if (await collection.findOne({ id: user.login })) {
    return "User already exists.";
  } else {
    await collection.insertOne(data);
    return "data added";
  }
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
