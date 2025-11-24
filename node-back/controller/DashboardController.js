const Booking = require("../model/Booking");
const Client = require("../model/Client");
const Payment = require("../model/Payment");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalClients = await Client.countDocuments();
    const totalPayments = await Payment.countDocuments();

    const today = new Date().toISOString().split("T")[0];

    const completedAppointments = await Booking.countDocuments({
      Available_Date: { $lt: today },
      ScheduleID: { $ne: null },
    });

    const recentBookings = await Booking.aggregate([
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
          id: "$BookingID",
          client: "$client.Client_Name",
          lawyer: "$lawyer.Lawyer_Name",
          status: "$Status",

          // DATE/TIME FIXED HERE
          date: "$schedule.Available_Date",
          time: {
            $cond: [
              { $ifNull: ["$schedule.Start_Time", false] },
              { $concat: ["$schedule.Start_Time", " - ", "$schedule.End_Time"] },
              null,
            ],
          },
        },
      },

      { $sort: { BookingID: -1 } },
      { $limit: 3 },
    ]);

    res.json({
      totalBookings,
      totalClients,
      totalPayments,
      completedAppointments,
      recentBookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
