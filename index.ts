import express from "express";
import dotenv from 'dotenv'; 
import mongoose from "mongoose"; 
import cors from "cors"; 
import path from "path";
import stockRoutes from './routes/index'

dotenv.config(); // Load environment variables

const PORT = 3000;
const app = express();
app.use(cors()); 
app.use(express.json());  
app.use("/stock", stockRoutes); 

app.use(express.static("public"));
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

const baseUrl = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=FZ5uc_gWEtV6WspTfP9Z1M8SJY8EZs6b'; // Polygon API base URL

mongoose.connect('mongodb+srv://dizzywebbeb:eDvL5PVyuwvo3Cds@cluster0.admjbk2.mongodb.net/', { dbName: "essentiallyImp1" }); 

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// mongodb+srv://dizzywebbeb:eDvL5PVyuwvo3Cds@cluster0.admjbk2.mongodb.net/