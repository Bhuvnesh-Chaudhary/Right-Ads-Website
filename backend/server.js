const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const careerRoutes = require("./routes/careerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/career", careerRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/proposal", proposalRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Right Ads Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
