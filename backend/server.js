const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Right Ads Backend Running");
});

app.use("/api/leads", leadRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`✅ Server Running On Port ${PORT}`);
});