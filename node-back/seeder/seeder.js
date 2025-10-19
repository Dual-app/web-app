const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const crypto = require('crypto');

// Use same connection string as main.js - change if you use env vars
const MONGO_URL =
  'mongodb+srv://Project:P4ter2442@project.valhjwp.mongodb.net/?retryWrites=true&w=majority&appName=Project';

function hashPassword(password) {
  // lightweight hash for seed only. For production use bcrypt and proper salting.
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB for seeding');

    const defaultAdmin = {
      Admin_ID: 1,
      Admin_Name: 'Super Admin',
      Admin_Email: 'Superadmin@gmail.com',
      Admin_Password: hashPassword('Superadmin123!@#'),
      PhoneNumber: '555-123-4567',
      Address : '123 Admin St, City, New York',
      IsSuperAdmin: true,
    };

    // Upsert by Admin_ID or Admin_Email
    const existing = await Admin.findOne({ $or: [{ Admin_ID: defaultAdmin.Admin_ID }, { Admin_Email: defaultAdmin.Admin_Email }] });
    if (existing) {
      // Update existing (but don't lower privileges accidentally)
      existing.Admin_Name = defaultAdmin.Admin_Name;
      existing.Admin_Password = defaultAdmin.Admin_Password;
      existing.PhoneNumber = defaultAdmin.PhoneNumber;
      existing.IsSuperAdmin = defaultAdmin.IsSuperAdmin;
      await existing.save();
      console.log('Updated existing admin:', existing.Admin_Email);
    } else {
      const created = await Admin.create(defaultAdmin);
      console.log('Created admin:', created.Admin_Email);
    }

    await mongoose.disconnect();
    console.log('Seeding complete, disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { seed };
