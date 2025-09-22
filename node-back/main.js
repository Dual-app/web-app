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
    ID: 1,
    Name: "John Doe",
    Address: "123 Main St, City, Country",
    Phone: "+1234567890",
    Type: "Criminal",
    Availability: "Available",
  },
  {
    ID: 2,
    Name: "Jane Smith",
    Address: "456 Elm St, City, Country",
    Phone: "+9876543210",
    Type: "Business",
    Availability: "Not Available",
  },
  {
    ID: 3,
    Name: "Alice Johnson",
    Address: "789 Oak St, City, Country",
    Phone: "+1122334455",
    Type: "Family",
    Availability: "Available",
  },
  {
    ID: 4,
    Name: "Bob Brown",
    Address: "321 Pine St, City, Country",
    Phone: "+5566778899",
    Type: "Corporate",
    Availability: "Not Available",
  },
  {
    ID: 5,
    Name: "Charlie Davis",
    Address: "654 Cedar St, City, Country",
    Phone: "+9988776655",
    Type: "Criminal",
    Availability: "Available",
  },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.get("/api/hello", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
