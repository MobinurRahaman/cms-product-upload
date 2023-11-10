const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const config = require("./config");
const path = require("path");
const cors = require("cors"); // Import the CORS middleware

const app = express();

// Configure CORS to allow requests from http://localhost:3000
const allowedOrigins = ["http://localhost:3000"];

// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(bodyParser.json());
app.use("/api", productRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve files from the "uploads" directory

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = app;
