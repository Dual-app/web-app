import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const clientId = localStorage.getItem("clientId");
  const navigate = useNavigate();

  useEffect(() => {
    // Example bookings (with appointment info)
    const exampleBooking = [
      {
        Booking_ID: "BKG-001",
        Lawyer_Name: "John Doe",
        Case_Type: "Corporate",
        Status: "Case Submitted",
        Appointment_Time: null,
      },
      {
        Booking_ID: "BKG-002",
        Lawyer_Name: "Jane Smith",
        Case_Type: "Criminal",
        Status: "Paid",
        Appointment_Time: "2025-11-02 10:00 AM",
      },
      {
        Booking_ID: "BKG-003",
        Lawyer_Name: "Aung Kyaw",
        Case_Type: "Family",
        Status: "Completed",
        Appointment_Time: "2025-10-12 02:00 PM",
      },
    ];

    setBookings(exampleBooking);
  }, [clientId, navigate]);

  // Filter confirmed/assigned bookings
  const confirmedBookings = bookings.filter(
    (b) => b.Status === "Paid" || b.Status === "Completed"
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-6">
      {/* HEADER */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-semibold text-[#1A3636] text-center mb-2">
          My Booking History
        </h1>
        <p className="text-center text-gray-600 text-sm">
          View your submitted cases, payments, and appointment details.
        </p>
      </div>

      {/* STATUS LEGEND */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-end mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full"></span> Case Submitted
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full"></span> Paid
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Completed
        </div>
      </div>

      {/* BOOKING TABLE */}
      <div className="max-w-6xl mx-auto overflow-x-auto">
        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            You have no bookings yet.
          </p>
        ) : (
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-[#83B582] text-white uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Booking ID</th>
                <th className="px-4 py-3 text-left">Lawyer</th>
                <th className="px-4 py-3 text-left">Case Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.Booking_ID}
                  className={`border-b hover:bg-gray-100 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {booking.Booking_ID}
                  </td>
                  <td className="px-4 py-3">{booking.Lawyer_Name}</td>
                  <td className="px-4 py-3">{booking.Case_Type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.Status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : booking.Status === "Case Submitted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.Status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {booking.Status === "Case Submitted" && (
                      <button
                        onClick={() =>
                          navigate(`/top-up?bookingId=${booking.Booking_ID}`)
                        }
                        className="text-white bg-[#83B582] px-3 py-1 rounded hover:bg-[#55a754] transition"
                      >
                        Make Payment
                      </button>
                    )}
                    {booking.Status === "Paid" && (
                      <span className="text-gray-600 text-xs">
                        Awaiting appointment
                      </span>
                    )}
                    {booking.Status === "Completed" && (
                      <span className="text-green-700 text-xs font-medium">
                        Appointment Finished
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CONFIRMED APPOINTMENTS SECTION */}
      {confirmedBookings.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#1A3636] mb-4 text-center">
            Confirmed Appointments
          </h2>

          {confirmedBookings.map((booking) => (
            <div
              key={booking.Booking_ID}
              className="border-t border-gray-200 py-4 first:border-t-0"
            >
              <p className="text-gray-800 font-medium">
                Booking ID: <span className="text-[#83B582]">{booking.Booking_ID}</span>
              </p>
              <p className="text-gray-700 mt-1">
                <b>Lawyer:</b> {booking.Lawyer_Name}
              </p>
              <p className="text-gray-700 mt-1">
                <b>Appointment Date & Time:</b>{" "}
                {booking.Appointment_Time || "Not yet assigned"}
              </p>
              <p className="text-gray-700 mt-1">
                <b>Location:</b> 123, Pyay Road, Myaynigone, Sanchaung Township
              </p>
              <p className="text-gray-600 text-sm mt-2 italic">
                Please arrive 10 minutes early for your scheduled consultation.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-xs mt-10 py-4 border-t">
        © {new Date().getFullYear()} LegalEase Law Firm. All Rights Reserved.
      </footer>
    </div>
  );
}
