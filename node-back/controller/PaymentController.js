const Payment = require("../model/Payment");

exports.createPayment = async (req, res) => {
  try {
    const { Amount, PaymentDate, PaymentMethod } = req.body;
    // Auto increment PaymentID
    const last = await Payment.findOne().sort({ PaymentID: -1 });
    const nextID = last ? last.PaymentID + 1 : 1;
    const newPayment = new Payment({
      PaymentID: nextID,
      Amount,
      PaymentDate,
      PaymentMethod,
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();  
    res.status(200).json(payments);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};