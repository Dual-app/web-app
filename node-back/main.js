const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongourl =
  "mongodb+srv://Project:P4ter2442@project.valhjwp.mongodb.net/?retryWrites=true&w=majority&appName=Project";
const mongoose = require("mongoose");
 
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const data = [
    {
    name : "Peter",
    age : 23
}
];
app.use(cors());
app.use(express.json());
 
app.get("/", (req, res) => {
  res.send("Server is up and running");
});
 
app.get("/api/hello", (req, res) => {
  res.json({ data });
});
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});