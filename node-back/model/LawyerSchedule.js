const mongoose = require("mongoose");

const LawyerScheduleSchema = new mongoose.Schema({
    Lawyer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
    Schedule_ID: { type: Number, required: true, unique: true },
    Available_Date: { type: String, required: true },
    Start_Time: { type: String, required: true },
    End_Time: { type: String, required: true },
    Status: { type: String, required: true },

});

module.exports = mongoose.model("LawyerSchedule", LawyerScheduleSchema);