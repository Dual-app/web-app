import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const clientId = localStorage.getItem("clientId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientId) {
      navigate("/login");
      return;
    }

    // Fetch bookings for this client
    fetch(`http://localhost:5000/bookings/client/${clientId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [clientId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-[#1A3636] mb-6">
          My Booking History
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">
            You have no bookings yet.
          </p>
        ) : (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-[#83B582] text-white">
              <tr>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Lawyer</th>
                <th className="px-4 py-2">Case Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.Booking_ID} className="border-t">
                  <td className="px-4 py-2">{booking.Booking_ID}</td>
                  <td className="px-4 py-2">{booking.Lawyer_Name}</td>
                  <td className="px-4 py-2">{booking.Case_Type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        booking.Status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : booking.Status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.Status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {booking.Status === "Pending" && (
                      <button
                        onClick={() =>
                          navigate(`/post-case?bookingId=${booking.Booking_ID}`)
                        }
                        className="px-3 py-1 bg-[#83B582] text-black rounded hover:bg-[#55a754]"
                      >
                        Continue Case
                      </button>
                    )}
                    {booking.Status === "Case Submitted" && (
                      <button
                        onClick={() =>
                          navigate(`/top-up?bookingId=${booking.Booking_ID}`)
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Make Payment
                      </button>
                    )}
                    {booking.Status === "Paid" && (
                      <span className="text-gray-500 text-sm">
                        Awaiting appointment
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
