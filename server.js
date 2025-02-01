const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// Middleware to handle JSON
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Auth API is Running...");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the database connection function
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
