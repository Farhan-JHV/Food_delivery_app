import express from "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";

// app config
// const path = require('path')
const app = express()
const port = process.env.PORT || 4000

// middleware

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL, // Set to your frontend's URL
    credentials: true,
}));


// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
    console.log(`Running in ${process.env.NODE_ENV} mode`);
})
