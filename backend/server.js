const express = require("express");
const cors = require("cors");
const path = require("path"); // 🌟 Path module jodd diya

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

// Database Connect
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌟 CRITICAL: Frontend files ko serve karne ke liye link jodd diya
app.use(express.static(path.join(__dirname, "../")));

// API Routes
app.use("/api/leads", leadRoutes);

// Agar koi static file na mile toh index.html par redirect kare
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`✅ Server Running On Port ${PORT}`);
});