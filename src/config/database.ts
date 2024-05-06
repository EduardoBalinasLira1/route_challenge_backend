
const { MongoClient, ServerApiVersion } = require('mongodb');
import dotenv from "dotenv";

dotenv.config();
const uri = "mongodb+srv://eduardobalinaslira:5N9qjUf1CPNYxnDH@cluster0.c8plphw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

console.log(client);


const getCollections = async ( dbName: string, collectionName: string ) => {
    try {
        await client.connect();
        console.log("Llego a la conexion");
        
        await client.db("admin").command({ ping: 1 });
        
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName);
    
        return collection
    }catch (error: any) {
      console.error("An error occurred:", error); 
    } 
    
}

export default getCollections
