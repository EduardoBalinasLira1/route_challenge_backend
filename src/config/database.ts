
const { MongoClient, ServerApiVersion } = require('mongodb');
import dotenv from "dotenv";

dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const getCollections = async ( dbName: string, collectionName: string ) => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Conexion exitsoasa");
        
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName);
    
        return collection
    }catch {
        console.log("Fallo algo");
        
    } 
    
}

export default getCollections
