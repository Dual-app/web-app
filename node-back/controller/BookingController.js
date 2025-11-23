const Booking = require("../model/Booking");

exports.createBooking = async (req, res) => {
  try {
    const {
      CustomerID,
      LawyerID,
      Case_Title,
      Case_Description,
      Additional_Notes,
      BookingDate,
      BookingTime,
      Status
    } = req.body;

    // Auto increment BookingID
    const last = await Booking.findOne().sort({ BookingID: -1 });
    const nextID = last ? last.BookingID + 1 : 1;

    // File upload
    let documentPath = null;
    if (req.file) {
      documentPath = `/bookingdocs/${req.file.filename}`;
    }

    const newBooking = new Booking({
      BookingID: nextID,
      CustomerID,
      LawyerID,
      Case_Title,
      Case_Description,
      Additional_Notes,
      BookingDate: BookingDate || null,
      BookingTime: BookingTime || null,
      Document: documentPath,
      Status: Status || "Pending"
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getByCustomer = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await Booking.find({ CustomerID: id });
    res.json(data);
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
      { $unwind: "$lawyer" }
    ]);

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};