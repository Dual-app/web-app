const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    PaymentID: { type: Number, required: true, unique: true },
    Amount: { type: Number, required: true },
    PaymentDate: { type: Date, required: true },
    PaymentMethod: { type: String, required: true },
});

module.exports = mongoose.model('Payment', PaymentSchema);