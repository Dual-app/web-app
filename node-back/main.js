const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");
const mongourl =
  "mongodb+srv://Project:P4ter2442@project.valhjwp.mongodb.net/?retryWrites=true&w=majority&appName=Project";

const lawyerRoutes = require("./routes/LawyerRoutes");
const LawyerScheduleRoutes = require("./routes/LawyerSchedules");
const AdminRoutes = require("./routes/AdminRoutes");
const LawbookRoutes = require("./routes/LawbookRoutes");
const ClientRoutes = require("./routes/ClientRoute");
const BookingRoutes = require("./routes/BookingRoute");
const PaymentRoutes = require("./routes/PaymentRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const DashboardRoutes = require("./routes/DashboardRoutes");

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
app.use("/bookingdocs", express.static(path.join(__dirname, "bookingdocs")));
app.use("/pngfiles", express.static(path.join(__dirname, "pngfiles")));
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/lawyerschedules", LawyerScheduleRoutes);
app.use("/api/admins", AdminRoutes);
app.use("/api/lawbooks", LawbookRoutes);
app.use("/api/clients", ClientRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api", DashboardRoutes);
