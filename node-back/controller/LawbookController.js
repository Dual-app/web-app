const Lawbook = require("../model/Lawbook");

exports.createLawbook = async (req, res) => {
  try {
    const { Title, Author, Year, Category, ShortPreview } = req.body;

    // Duplicate check
    const exists = await Lawbook.findOne({ Title, Author });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Lawbook already exists with this Title and Author" });
    }

    // Auto-ID
    const last = await Lawbook.findOne().sort({ Lawbook_ID: -1 });
    const nextID = last ? last.Lawbook_ID + 1 : 1;

    // Handle uploaded file
    if (!req.file) {
      return res.status(400).json({ message: "File upload required" });
    }

    const filePath = `/pngfiles/Lawbook/${req.file.filename}`;

    const newLawbook = new Lawbook({
      Lawbook_ID: nextID,
      Title,
      Author,
      Year,
      Category,
      ShortPreview,
      FilePath: filePath,
    });

    await newLawbook.save();
    res.status(201).json(newLawbook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllLawbooks = async (req, res) => {
  try {
    const lawbooks = await Lawbook.find();
    res.status(200).json(lawbooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLawbook = async (req, res) => {
  try {
    const lawbookId = Number(req.params.id);

    const existing = await Lawbook.findOne({ Lawbook_ID: lawbookId });

    let updates = req.body;

    // If no new file, keep the old one
    if (!req.file) {
      updates.FilePath = existing.FilePath;
    } else {
      updates.FilePath = `/pngfiles/Lawbook/${req.file.filename}`;
    }

    const updated = await Lawbook.findOneAndUpdate(
      { Lawbook_ID: lawbookId },
      updates,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteLawbook = async (req, res) => {
  try {
    const lawbookId = Number(req.params.id);
    const deletedLawbook = await Lawbook.findOneAndDelete({
      Lawbook_ID: lawbookId,
    });
    if (!deletedLawbook) {
      return res.status(404).json({ message: "Lawbook not found" });
    }
    res.status(200).json({ message: "Lawbook deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.previewLawbook = async (req, res) => {
  try {
    const lawbookId = Number(req.params.id);
    const lawbook = await Lawbook.findOne({ Lawbook_ID: lawbookId });
    if (!lawbook) {
      return res.status(404).json({ message: "Lawbook not found" });
    }
    res.status(200).json({ FilePath: lawbook.FilePath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
