const Booking = require("../model/Booking");
const Payment = require("../model/Payment");

exports.createBookingWithPayment = async (req, res) => {
  try {
    // Extract payment data
    const { Amount, PaymentMethod } = req.body;
    const PaymentDate = new Date();

    // 1️⃣ Create Payment
    const lastPayment = await Payment.findOne().sort({ PaymentID: -1 });
    const nextPaymentID = lastPayment ? lastPayment.PaymentID + 1 : 1;

    const newPayment = new Payment({
      PaymentID: nextPaymentID,
      Amount,
      PaymentMethod,
      PaymentDate,
    });
    await newPayment.save();

    // 2️⃣ Create Booking (linked to PaymentID)
    const lastBooking = await Booking.findOne().sort({ BookingID: -1 });
    const nextBookingID = lastBooking ? lastBooking.BookingID + 1 : 1;

    const documentPath = req.file ? `/bookingdocs/${req.file.filename}` : null;

    const newBooking = new Booking({
      BookingID: nextBookingID,
      CustomerID: req.body.CustomerID,
      LawyerID: req.body.LawyerID,
      ScheduleID:  null,
      Case_Title: req.body.Case_Title,
      Case_Description: req.body.Case_Description,
      Additional_Notes: req.body.Additional_Notes,
      Document: documentPath,
      PaymentID: nextPaymentID, // 🔗 LINK
      Status: "Pending",
    });

    await newBooking.save();

    return res.status(201).json({
      payment: newPayment,
      booking: newBooking,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Booking.findOneAndDelete({ BookingID: id });

    if (!deleted) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.closeBooking = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await Booking.findOneAndUpdate(
      { BookingID: id },
      { Status: "Closed" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByCustomer = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await Booking.aggregate([
      { $match: { CustomerID: id } },
      {
        $lookup: {
          from: "lawyers",
          localField: "LawyerID",
          foreignField: "Lawyer_ID",
          as: "lawyer",
        },
      },
      { $unwind: "$lawyer" },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.insertScheduleID = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { ScheduleID } = req.body;
    const updatedBooking = await Booking.findOneAndUpdate(
      { BookingID: bookingId },
      { ScheduleID: ScheduleID },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.previewDocument = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const booking = await Booking.findOne({ BookingID: bookingId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ Document: booking.Document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
