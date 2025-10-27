const Lawbook = require('../model/Lawbook');

exports.createLawbook = async (req, res) => {
    try {
        // Check for duplicates
        const exists = await Lawbook.findOne({ Title: Title, Author: Author });
        if (exists) {
            return res.status(400).json({ message: 'Lawbook already exists with the same title and author.' });
        }
        // Find the current max Lawbook_ID
        const lastLawbook = await Lawbook.findOne().sort({ Lawbook_ID: -1 });
        const nextID = lastLawbook ? lastLawbook.Lawbook_ID + 1 : 1;
        // Create new lawbook
        const newLawbook = new Lawbook({
            Lawbook_ID: nextID,
            Title: req.body.Title,
            Author : req.body.Author,
            Year: req.body.Year,
            Category: req.body.Category,
            ShortPreview: req.body.ShortPreview,
            FilePath: "example",
        });
        await newLawbook.save();
        res.status(201).json(newLawbook);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllLawbooks = async (req, res) => {
    try {
        const lawbooks = await Lawbook.find();
        res.status(200).json(lawbooks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLawbook = async (req, res) => {
    try {
        const lawbookId = Number(req.params.id);
        // Prevent updating Lawbook_ID
        if ('Lawbook_ID' in req.body) delete req.body.Lawbook_ID;
        const updatedLawbook = await Lawbook.findOneAndUpdate(
            { Lawbook_ID: lawbookId },
            req.body,
            { new: true }
        );
        if (!updatedLawbook) {
            return res.status(404).json({ message: 'Lawbook not found' });
        }
        res.status(200).json(updatedLawbook);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLawbook = async (req, res) => {
    try {
        const lawbookId = Number(req.params.id);
        const deletedLawbook = await Lawbook.findOneAndDelete({ Lawbook_ID: lawbookId });
        if (!deletedLawbook) {
            return res.status(404).json({ message: 'Lawbook not found' });
        }
        res.status(200).json({ message: 'Lawbook deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};