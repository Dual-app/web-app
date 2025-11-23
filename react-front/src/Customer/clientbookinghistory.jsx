import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNotes, setEditNotes] = useState("");
  const clientId = localStorage.getItem("clientId") || "CL-0001";
  const navigate = useNavigate();

  useEffect(() => {
    const now = Date.now();

    // Example bookings (mock)
    const exampleBooking = [
      {
        Booking_ID: "BKG-001",
        Lawyer_Name: "John Doe",
        Case_Type: "Corporate",
        Payment_Status: "Pending", // not paid yet
        Booking_Status: "Draft",
        Notes: "Need advice on contract review.",
        Created_At: new Date(now - 1 * 60 * 60 * 1000).toISOString(), // 1h ago
      },
      {
        Booking_ID: "BKG-002",
        Lawyer_Name: "Jane Smith",
        Case_Type: "Criminal",
        Payment_Status: "Paid",
        Booking_Status: "Confirmed",
        Appointment_Date: "2025-11-02",
        Appointment_Time: "10:00 AM",
        Notes: "I might bring one witness.",
        Created_At: new Date(now - 5 * 60 * 60 * 1000).toISOString(), // 5h ago (editable)
      },
      {
        Booking_ID: "BKG-003",
        Lawyer_Name: "Aung Kyaw",
        Case_Type: "Family",
        Payment_Status: "Paid",
        Booking_Status: "Completed",
        Appointment_Date: "2025-10-12",
        Appointment_Time: "02:00 PM",
        Notes: "Child custody case.",
        Created_At: new Date(now - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (locked)
      },
    ];

    setBookings(exampleBooking);

    // Later: replace with real API
    /*
    fetch(`http://localhost:5000/bookings/client/${clientId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
    */
  }, [clientId]);

  //---------------------------------------------------------
  // Helpers
  //---------------------------------------------------------
  const statusBadgeClass = (b) => {
    if (b.Payment_Status !== "Paid") return "bg-yellow-100 text-yellow-700";
    if (b.Booking_Status === "Completed")
      return "bg-gray-100 text-gray-700";
    if (b.Booking_Status === "Confirmed")
      return "bg-green-100 text-green-700";
    return "bg-blue-100 text-blue-700"; // Paid but maybe not confirmed yet
  };

  const statusLabel = (b) => {
    if (b.Payment_Status !== "Paid") return "Awaiting Payment";
    if (b.Booking_Status === "Completed") return "Completed";
    if (b.Booking_Status === "Confirmed") return "Confirmed";
    return "Paid";
  };

  const canEditNotes = (b) => {
    if (b.Payment_Status !== "Paid") return false;
    if (b.Booking_Status === "Completed") return false;
    if (!b.Created_At) return false;

    const created = new Date(b.Created_At).getTime();
    const diffHours = (Date.now() - created) / (1000 * 60 * 60);
    return diffHours <= 12; // only within 12 hours
  };

  //---------------------------------------------------------
  // Modal handlers
  //---------------------------------------------------------
  const openDetailModal = (booking) => {
    setSelectedBooking(booking);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedBooking(null);
  };

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setEditNotes(booking.Notes || "");
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedBooking(null);
    setEditNotes("");
  };

  //---------------------------------------------------------
  // Save edit (Notes) + notify admin
  //---------------------------------------------------------
  const handleSaveEdit = () => {
    if (!selectedBooking) return;

    const updated = bookings.map((b) =>
      b.Booking_ID === selectedBooking.Booking_ID
        ? { ...b, Notes: editNotes }
        : b
    );
    setBookings(updated);

    // 🔔 Notify admin (front-end event)
    window.dispatchEvent(
      new CustomEvent("app:new-notification", {
        detail: {
          type: "booking_edit",
          title: "Booking updated by client",
          message: `Client ${clientId} updated booking ${selectedBooking.Booking_ID}.`,
          href: `/admin/bookings?bookingId=${selectedBooking.Booking_ID}`,
          createdAt: Date.now(),
        },
      })
    );

    // 🔌 Backend placeholder (for later)
    /*
    fetch("/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "booking_edit",
        bookingId: selectedBooking.Booking_ID,
        clientId,
        notes: editNotes,
      }),
    }).catch(console.error);
    */

    closeEditModal();
  };

  //---------------------------------------------------------
  // Derived lists
  //---------------------------------------------------------
  const confirmedBookings = bookings.filter(
    (b) =>
      b.Payment_Status === "Paid" &&
      (b.Booking_Status === "Confirmed" || b.Booking_Status === "Completed")
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-6">
      {/* HEADER */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-semibold text-[#1A3636] text-center mb-2">
          My Booking History
        </h1>
        <p className="text-center text-gray-600 text-sm">
          View your submitted cases, payments, and confirmed booking details.
        </p>
      </div>

      {/* STATUS LEGEND */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-end mb-4 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Awaiting
          Payment
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full"></span> Paid
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full"></span> Confirmed
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
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                const editable = canEditNotes(booking);
                return (
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
                        className={`px-2 py-1 rounded text-xs font-semibold ${statusBadgeClass(
                          booking
                        )}`}
                      >
                        {statusLabel(booking)}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {/* Make Payment */}
                      {booking.Payment_Status !== "Paid" && (
                        <button
                          onClick={() =>
                            navigate(
                              `/customer/topuppg?bookingId=${booking.Booking_ID}`
                            )
                          }
                          className="mb-1 inline-block text-white bg-[#83B582] px-3 py-1 rounded hover:bg-[#55a754] text-xs"
                        >
                          Make Payment
                        </button>
                      )}

                      {/* View details */}
                      <button
                        onClick={() => openDetailModal(booking)}
                        className="mb-1 inline-block px-3 py-1 border border-[#83B582] text-[#1A3636] rounded text-xs hover:bg-[#83B582] hover:text-white"
                      >
                        View Details
                      </button>

                      {/* Edit notes (if allowed) */}
                      {editable ? (
                        <button
                          onClick={() => openEditModal(booking)}
                          className="mb-1 inline-block px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit Notes
                        </button>
                      ) : (
                        booking.Payment_Status === "Paid" && (
                          <span className="block text-[10px] text-gray-500">
                            Edit locked after 12 hours
                          </span>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* CONFIRMED APPOINTMENTS SECTION */}
      {confirmedBookings.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#1A3636] mb-4 text-center">
            Confirmed Bookings
          </h2>

          {confirmedBookings.map((booking) => (
            <div
              key={booking.Booking_ID}
              className="border-t border-gray-200 py-4 first:border-t-0"
            >
              <p className="text-gray-800 font-medium">
                Booking ID:{" "}
                <span className="text-[#83B582]">{booking.Booking_ID}</span>
              </p>
              <p className="text-gray-700 mt-1">
                <b>Lawyer:</b> {booking.Lawyer_Name}
              </p>
              <p className="text-gray-700 mt-1">
                <b>Appointment Date & Time:</b>{" "}
                {booking.Appointment_Date && booking.Appointment_Time
                  ? `${booking.Appointment_Date} — ${booking.Appointment_Time}`
                  : "Waiting for admin confirmation"}
              </p>
              <p className="text-gray-700 mt-1">
                <b>Location:</b> 123, Pyay Road, Myaynigone, Sanchaung Township
              </p>
              {booking.Notes && (
                <p className="text-gray-700 mt-1">
                  <b>Your Notes:</b> {booking.Notes}
                </p>
              )}
              <p className="text-gray-600 text-xs mt-2 italic">
                Please arrive 10 minutes early for your scheduled consultation.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS MODAL */}
      {detailModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-lg font-semibold text-[#1A3636] mb-3">
              Booking Details
            </h3>
            <div className="space-y-1 text-sm text-gray-800">
              <p>
                <b>Booking ID:</b> {selectedBooking.Booking_ID}
              </p>
              <p>
                <b>Lawyer:</b> {selectedBooking.Lawyer_Name}
              </p>
              <p>
                <b>Case Type:</b> {selectedBooking.Case_Type}
              </p>
              <p>
                <b>Status:</b> {statusLabel(selectedBooking)}
              </p>
              <p>
                <b>Payment:</b> {selectedBooking.Payment_Status}
              </p>
              <p>
                <b>Appointment:</b>{" "}
                {selectedBooking.Appointment_Date &&
                selectedBooking.Appointment_Time
                  ? `${selectedBooking.Appointment_Date} — ${selectedBooking.Appointment_Time}`
                  : "Not confirmed yet"}
              </p>
              <p>
                <b>Location:</b> 123, Pyay Road, Myaynigone, Sanchaung Township
              </p>
              <p className="mt-2">
                <b>Your Notes:</b>{" "}
                {selectedBooking.Notes?.trim()
                  ? selectedBooking.Notes
                  : "No notes added yet."}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={closeDetailModal}
                className="px-4 py-1.5 text-xs border rounded hover:bg-gray-100"
              >
                Close
              </button>
              {canEditNotes(selectedBooking) && (
                <button
                  onClick={() => {
                    closeDetailModal();
                    openEditModal(selectedBooking);
                  }}
                  className="px-4 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit Notes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#1A3636] mb-3">
              Edit Notes (Booking {selectedBooking.Booking_ID})
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              You can update your notes within 12 hours after submitting and
              paying for your booking.
            </p>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm h-28 focus:border-[#83B582]"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Add any important information for your lawyer..."
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeEditModal}
                className="px-4 py-1.5 text-xs border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 text-xs bg-[#83B582] text-black rounded hover:bg-[#55a754]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-xs mt-10 py-4 border-t">
        © {new Date().getFullYear()} LegalEase Law Firm. All Rights Reserved.
      </footer>
    </div>
  );
}
