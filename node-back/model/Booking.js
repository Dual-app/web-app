const mongoose = require("mongoose");
const Lawyer = require("./Lawyer");

const BookingSchema = new mongoose.Schema({
  BookingID: { type: Number, required: true, unique: true },
  CustomerID: { type: Number, required: true, ref: "Customer" }, 
  BookingDate: { type: Date, required: false },
  BookingTime: { type: String, required: false },
  LawyerID: { type: Number, required: true, ref: Lawyer },
  Case_Title: { type: String, required: true },
  Case_Description: { type: String, required: true },
  Additional_Notes: { type: String, required: false },
  Document: { type: String, required: false },
  Status: { type: String, required: true, default: "Pending" },
});

module.exports = mongoose.model("Booking", BookingSchema);
