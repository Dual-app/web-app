const mongoose = require('mongoose');

const LawbookSchema = new mongoose.Schema({
    Lawbook_ID: { type: Number, required: true, unique: true },
    Title: { type: String, required: true },
    Author : { type: String, required: true },
    Year: { type: Number, required: true },
    Category: { type: String, required: true },
    ShortPreview: { type: String, required: true },
    FilePath: { type: String, required: true },
});

module.exports = mongoose.model('Lawbook', LawbookSchema);
