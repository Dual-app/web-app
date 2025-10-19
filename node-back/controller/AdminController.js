const Admin = require('../model/Admin');
const crypto = require('crypto');

exports.createAdmin = async (req, res) => {
    try {
        // Check for duplicates
        const exists = await Admin.findOne({ Admin_Email: req.body.Admin_Email });
        if (exists) {
            return res.status(400).json({ message: 'Admin already exists with the same email.' });
        }
        // Find the current max Admin_ID
        const lastAdmin = await Admin.findOne().sort({ Admin_ID: -1 });
        const nextID = lastAdmin ? lastAdmin.Admin_ID + 1 : 1;
        const hashPassword = (password) => {
            return crypto.createHash('sha256').update(password).digest('hex');
        }
        // Create new admin
        const newAdmin = new Admin({
            Admin_ID: nextID,
            Admin_Name: req.body.Admin_Name,
            Admin_Email: req.body.Admin_Email,
            Admin_Password: hashPassword(req.body.Admin_Password),
            PhoneNumber: req.body.PhoneNumber,
            Address: req.body.Address || "",
            IsSuperAdmin: req.body.IsSuperAdmin || false
        });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

exports .getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const adminId = Number(req.params.id);
        const hashPassword = (password) => {
            return crypto.createHash('sha256').update(password).digest('hex');
        }
        // Prevent updating Admin_ID
        if ('Admin_ID' in req.body) delete req.body.Admin_ID;
        // Hash password if it's being updated
        if ('Admin_Password' in req.body) {
            req.body.Admin_Password = hashPassword(req.body.Admin_Password);
        }
        const updatedAdmin = await Admin.findOneAndUpdate(
            { Admin_ID: adminId },
            req.body,
            { new: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }   
        res.status(200).json(updatedAdmin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = Number(req.params.id);
        const deletedAdmin = await Admin.findOneAndDelete({ Admin_ID: adminId });
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

