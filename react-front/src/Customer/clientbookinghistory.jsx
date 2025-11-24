import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../content/AuthContext";
import { useBookingHistory } from "../hooks/BookingHook";
import { BookingAPI } from "../api/BookingAPI";

export default function ClientBookingHistory() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // AUTH PROTECTION
  useEffect(() => {
    if (!auth || !auth.user) navigate("/login");
  }, [auth, navigate]);

  const customerID = auth?.user?.id?.toString();
  const { bookings, loading, fetchHistory } = useBookingHistory(customerID);

  // Handle close
  const handleClose = async (bookingID) => {
    // Optimistic update
    setBookings((prev) =>
      prev.map((b) =>
        b.BookingID === bookingID ? { ...b, Status: "Closed" } : b
      )
    );

    await BookingAPI.close(bookingID);
    fetchHistory();
    alert(`Booking ${bookingID} has been closed.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-6">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-semibold text-[#1A3636] text-center">
          My Booking History
        </h1>
      </div>

      <div className="max-w-6xl mx-auto overflow-x-auto">
        {loading ? (
          <p className="text-gray-600 text-center py-10">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            No previous bookings found.
          </p>
        ) : (
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-[#83B582] text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Case ID</th>
                <th className="px-4 py-3 text-left">Case Title</th>
                <th className="px-4 py-3 text-left">Lawyer Name</th>
                <th className="px-4 py-3 text-left">Booking Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, index) => (
                <tr
                  key={b.BookingID}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 font-semibold">{b.BookingID}</td>
                  <td className="px-4 py-3">{b.Case_Title}</td>
                  <td className="px-4 py-3">{b.Lawyer_Name || "-"}</td>

                  <td className="px-4 py-3">{b.Available_Date || "-"}</td>

                  <td className="px-4 py-3">
                    {b.Start_Time ? `${b.Start_Time} - ${b.End_Time}` : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        b.Status === "Closed"
                          ? "bg-gray-300 text-gray-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.Status || "Submitted"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {b.Status !== "Closed" && (
                      <button
                        onClick={() => handleClose(b.BookingID)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Close Case
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="text-center text-gray-600 text-xs mt-10 py-4">
        © {new Date().getFullYear()} LegalEase Law Firm.
      </footer>
    </div>
  );
}
