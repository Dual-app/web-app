const Lawyer = require("../model/Lawyer");

exports.createLawyer = async (req, res) => {
  try {
    // Find the current max Lawyer_ID
    const lastLawyer = await Lawyer.findOne().sort({ Lawyer_ID: -1 });
    const nextID = lastLawyer ? lastLawyer.Lawyer_ID + 1 : 1;

    // Create new lawyer with generated Lawyer_ID
    const newLawyer = new Lawyer({
      Lawyer_ID: nextID,
      Lawyer_Name: req.body.Lawyer_Name,
      Lawyer_Address: req.body.Lawyer_Address,
      Lawyer_Phone: req.body.Lawyer_Phone,
      Lawyer_Type: req.body.Lawyer_Type,
    });

    await newLawyer.save();
    res.status(201).json(newLawyer);
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
    const updatedLawyer = await Lawyer.findByIdAndUpdate(
      req.params.id,
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
    const deletedLawyer = await Lawyer.findByIdAndDelete(req.params.id);
    if (!deletedLawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.status(200).json({ message: "Lawyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
