import express from "express";
import index from "./src/routes"
import dotenv from "dotenv";
import cors from "cors"


dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())
app.use(index)

app.listen(process.env.PORT, async () => { 
    console.log("RUN port ", process.env.PORT);
})