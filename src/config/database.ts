
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://eduardobalinaslira:5N9qjUf1CPNYxnDH@cluster0.c8plphw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

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
        console.log("Entro a la conexion de la base de datos");
        
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName);
    
        return collection
    }catch {
        console.log("Fallo algo");
        
    } 
    
}

export default getCollections
