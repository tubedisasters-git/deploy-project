// api/new-meetup
// POST api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //  const { image, title, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://tubedisasters:televi5edM1nd$@cluster0.ixbewm7.mongodb.net/meetupsdb?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Document inserted" });
  }
}
export default handler;
