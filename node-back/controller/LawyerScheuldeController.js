const LawyerSchedule = require("../model/LawyerSchedule");

exports.createLawyerSchedule = async (req, res) => {
  try {
    // Check for duplicates
    const exists = await LawyerSchedule.findOne({
      Lawyer_ID: req.body.Lawyer_ID,
      Available_Date: new Date(req.body.Available_Date).toISOString().split("T")[0],
        Start_Time: req.body.Start_Time,
        End_Time: req.body.End_Time,
    });
    if (exists) {
      return res.status(400).json({
        message:
          "Schedule already exists for the same lawyer, date, and time.",
      });
    }
    else {
      // Find the current max Schedule_ID
      const lastSchedule = await LawyerSchedule.findOne().sort({ Schedule_ID: -1 });
      const nextID = lastSchedule ? lastSchedule.Schedule_ID + 1 : 1;
        // Create new lawyer schedule
        const newSchedule = new LawyerSchedule({
        Lawyer_ID: req.body.Lawyer_ID,
        Schedule_ID: nextID,    
        Available_Date: req.body.Available_Date,
        Start_Time: req.body.Start_Time,
        End_Time: req.body.End_Time,
        Status: req.body.Status,
      });
        await newSchedule.save();
        res.status(201).json(newSchedule);
    }
  }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
};

exports.getAllLawyerSchedules = async (req, res) => {
  try {
    const schedules = await LawyerSchedule.find().populate('Lawyer_ID');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLawyerSchedule = async (req, res) => {
    try {
        const scheduleId = Number(req.params.id);
        // Prevent updating Schedule_ID
        if ("Schedule_ID" in req.body) delete req.body.Schedule_ID;
        const updatedSchedule = await LawyerSchedule.findOneAndUpdate(
            { Schedule_ID: scheduleId },
            req.body,
            { new: true }
        );
        if (!updatedSchedule) {
            return res.status(404).json({ message: "Lawyer Schedule not found" });
        }
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteLawyerSchedule = async (req, res) => {
    try {
        const scheduleId = Number(req.params.id);
        const deletedSchedule = await LawyerSchedule.findOneAndDelete({ Schedule_ID: scheduleId });
        if (!deletedSchedule) {
            return res.status(404).json({ message: "Lawyer Schedule not found" });
        }
        res.status(200).json({ message: "Lawyer Schedule deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};