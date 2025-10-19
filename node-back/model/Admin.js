const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    Admin_ID: { type: Number, required: true, unique: true },
    Admin_Name: { type: String, required: true },
    Admin_Email: { type: String, required: true, unique: true },
    Admin_Password: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    Address : { type: String },
    IsSuperAdmin: { type: Boolean, default: false }
});
module.exports = mongoose.model('Admin', AdminSchema);