const Lawyer = require("../model/Lawyer");

exports.createLawyer = async (req, res) => {
  try {
    // Check for duplicates
    const exists = await Lawyer.findOne({
      Lawyer_Name: req.body.Lawyer_Name,
      Lawyer_Address: req.body.Lawyer_Address,
      Lawyer_Phone: req.body.Lawyer_Phone,
    });
    if (exists) {
      return res.status(400).json({
        message:
          "Lawyer already exists with the same name, address, and phone.",
      });
    } else {
      // Find the current max Lawyer_ID
      const lastLawyer = await Lawyer.findOne().sort({ Lawyer_ID: -1 });
      const nextID = lastLawyer ? lastLawyer.Lawyer_ID + 1 : 1;

      // Create new lawyer
      const newLawyer = new Lawyer({
        Lawyer_ID: nextID,
        Lawyer_Name: req.body.Lawyer_Name,
        Lawyer_Address: req.body.Lawyer_Address,
        Lawyer_Phone: req.body.Lawyer_Phone,
        Lawyer_Type: req.body.Lawyer_Type,
      });

      await newLawyer.save();
      res.status(201).json(newLawyer);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLawyer = async (req, res) => {
  try {
    const lawyerId = Number(req.params.id);
    // Prevent updating Lawyer_ID
    if ("Lawyer_ID" in req.body) delete req.body.Lawyer_ID;
    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { Lawyer_ID: lawyerId },
      req.body,
      { new: true }
    );
    if (!updatedLawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.status(200).json(updatedLawyer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLawyer = async (req, res) => {
  try {
    const deletedLawyer = await Lawyer.findOneAndDelete({
      Lawyer_ID: req.params.id,
    });
    if (!deletedLawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.status(200).json({ message: "Lawyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getscheduleByLawyer = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const schedules = await Lawyer.find
      .where("Lawyer_ID").equals(id)
      .populate("schedules");
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};