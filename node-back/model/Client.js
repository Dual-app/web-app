const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    Client_ID: { type: Number, required: true, unique: true },
    Client_Name: { type: String, required: true },
    Client_Email: { type: String, required: true, unique: true },
    Client_Password: { type: String, required: true },
});
module.exports = mongoose.model('Client', ClientSchema);