const Booking = require("../model/Booking");
const Client = require("../model/Client");
const Payment = require("../model/Payment");
const LawyerSchedule = require("../model/LawyerSchedule");

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
      ScheduleID: null,
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
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "CustomerID",
          foreignField: "Client_ID",
          as: "client",
        },
      },
      { $unwind: "$client" },

      {
        $lookup: {
          from: "lawyers",
          localField: "LawyerID",
          foreignField: "Lawyer_ID",
          as: "lawyer",
        },
      },
      { $unwind: "$lawyer" },

      {
        $lookup: {
          from: "lawyerschedules",
          localField: "ScheduleID",
          foreignField: "Schedule_ID",
          as: "schedule",
        },
      },
      {
        $unwind: {
          path: "$schedule",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          BookingID: 1,
          CustomerID: 1,
          LawyerID: 1,
          Case_Title: 1,
          Case_Description: 1,
          Status: 1,
          ScheduleID: 1,

          Client_Name: "$client.Client_Name",
          Lawyer_Name: "$lawyer.Lawyer_Name",

          Available_Date: "$schedule.Available_Date",
          Start_Time: "$schedule.Start_Time",
          End_Time: "$schedule.End_Time",
        },
      },
    ]);

    res.json(result);
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

      {
        $lookup: {
          from: "lawyerschedules",
          localField: "ScheduleID",
          foreignField: "Schedule_ID",
          as: "schedule",
        },
      },
      {
        $unwind: {
          path: "$schedule",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "clients",
          localField: "CustomerID",
          foreignField: "Client_ID",
          as: "client",
        },
      },
      { $unwind: "$client" },

      {
        $project: {
          BookingID: 1,
          Case_Title: 1,
          Status: 1,

          Lawyer_Name: "$lawyer.Lawyer_Name",
          Client_Name: "$client.Client_Name",

          Available_Date: "$schedule.Available_Date",
          Start_Time: "$schedule.Start_Time",
          End_Time: "$schedule.End_Time",
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.insertScheduleID = async (req, res) => {
  try {
    const bookingID = req.params.id;
    const { ScheduleID } = req.body;

    if (!ScheduleID) {
      return res.status(400).json({ message: "ScheduleID is required." });
    }

    // Find booking
    const booking = await Booking.findOne({ BookingID: bookingID });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Find schedule by correct field
    const schedule = await LawyerSchedule.findOne({ Schedule_ID: ScheduleID });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    // Ensure schedule belongs to the same lawyer
    if (String(schedule.Lawyer_ID) !== String(booking.LawyerID)) {
      return res.status(400).json({
        message: "Schedule does not belong to the assigned lawyer.",
      });
    }

    // Update schedule
    schedule.Status = "Booked";
    await schedule.save();

    // Update booking
    booking.ScheduleID = ScheduleID;
    booking.Status = "Booked";
    await booking.save();

    res.json({
      message: "Schedule assigned successfully.",
      booking,
    });
  } catch (err) {
    console.error("Schedule Insert Error:", err);
    res.status(500).json({ message: "Internal server error" });
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


