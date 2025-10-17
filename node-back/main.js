const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://Project:P4ter2442@project.valhjwp.mongodb.net/?retryWrites=true&w=majority&appName=Project";

const lawyerRoutes = require("./routes/LawyerRoutes");
const LawyerScheduleRoutes = require("./routes/LawyerSchedules");

mongoose
  .connect(mongourl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/lawyerschedules", LawyerScheduleRoutes);
