import express from "express";
import index from "./src/routes"
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())
app.use(index)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app