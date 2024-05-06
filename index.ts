import express from "express";
import index from "./src/routes"
import dotenv from "dotenv";
import cors from "cors"
import serverless from "serverless-http";


dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())
app.use(index)

export const handler = serverless(app);

