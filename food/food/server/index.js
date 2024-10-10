import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import connectDb from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import FoodRoutes from "./routes/Food.js";
import orderRoutes from './routes/orderRoutes.js'; // Import order routes
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cookieParser());
app.use(cors());

connectDb(DATABASE_URL);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Load Routes
app.use("/user", userRoutes);
app.use("/food", FoodRoutes);
app.use("/order", orderRoutes); // Use order routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
