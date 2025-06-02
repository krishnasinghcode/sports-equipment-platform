// imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import path from "path"
import cors from 'cors'

//importing routers
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from './routes/cartRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'

const app = express();
dotenv.config({ path: "./config/.env" });
const MONGODB_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:5500"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS")); // Block the request
        }
    },
    credentials: true // Allows cookies/auth headers
}));



// Parse incoming JSON
app.use(express.json());

// by default giving signup page
app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend/signup.html"));
});

// for user
app.use('/api/auth', authRoutes);

// for user product access
app.use('/api/products', productRoutes);

// cart
app.use('/api/cart', cartRoutes);

// reviews
app.use("/api/reviews", reviewRoutes);

// for admin
app.use('/api/admin', authRoutes);

//for admin products access
app.use('/api/admin/products', productRoutes);

// Database connection
connectDB(MONGODB_URI);

// server starting
app.listen(PORT, () => {
    console.log(`server is running successfully! PORT: ${PORT}`);
});