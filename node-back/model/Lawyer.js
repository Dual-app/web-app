const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema({
  Lawyer_ID: { type: Number, required: true, unique: true },
  Lawyer_Name: { type: String, required: true },
  Lawyer_Address: { type: String, required: true },
  Lawyer_Phone: { type: String, required: true },
  Lawyer_Type: { type: String, required: true },
});

module.exports = mongoose.model("Lawyer", LawyerSchema);
