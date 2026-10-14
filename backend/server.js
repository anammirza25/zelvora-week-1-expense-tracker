require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});