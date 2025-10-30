import React, { useState, useEffect } from "react";

export default function ClientAppointmentManagement() {
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch paid bookings (ready for scheduling)
  useEffect(() => {
    // Mocked paid bookings (for now)
    const mockBookings = [
      {
        Booking_ID: "BKG-001",
        Client_Name: "Mya Nandar",
        Lawyer_Name: "John Doe",
        Lawyer_ID: "L001",
        Case_Type: "Corporate",
        Status: "Paid",
      },
      {
        Booking_ID: "BKG-002",
        Client_Name: "David Lin",
        Lawyer_Name: "Jane Smith",
        Lawyer_ID: "L002",
        Case_Type: "Family",
        Status: "Paid",
      },
    ];
    setBookings(mockBookings);

    // Later, fetch from backend:
    /*
    fetch("http://localhost:5000/admin/bookings?status=Paid")
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings:", err));
    */
  }, []);

  // Fetch lawyer schedules
  useEffect(() => {
    // Mock schedule data
    const mockSchedules = [
      { Schedule_ID: "S001", Lawyer_ID: "L001", Date: "2025-11-05", Time: "09:00 AM", Status: "Available" },
      { Schedule_ID: "S002", Lawyer_ID: "L001", Date: "2025-11-05", Time: "02:00 PM", Status: "Available" },
      { Schedule_ID: "S003", Lawyer_ID: "L002", Date: "2025-11-06", Time: "10:00 AM", Status: "Available" },
      { Schedule_ID: "S004", Lawyer_ID: "L002", Date: "2025-11-06", Time: "03:30 PM", Status: "Available" },
    ];
    setSchedules(mockSchedules);

    // Later, from backend:
    /*
    fetch("http://localhost:5000/admin/lawyer-schedules")
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(err => console.error("Error fetching schedules:", err));
    */
  }, []);

  // Filter available schedules for the selected lawyer
  const availableSchedules = selectedBooking
    ? schedules.filter(
        (s) => s.Lawyer_ID === selectedBooking.Lawyer_ID && s.Status === "Available"
      )
    : [];

  const handleAssign = () => {
    if (!selectedBooking || !selectedSchedule || !status) {
      alert("Please select a booking, status, and schedule.");
      return;
    }

    // Find schedule details
    const chosenSchedule = schedules.find((s) => s.Schedule_ID === selectedSchedule);

    alert(
      `✅ Appointment assigned!\n\nClient: ${selectedBooking.Client_Name}\nLawyer: ${selectedBooking.Lawyer_Name}\nDate: ${chosenSchedule.Date} (${chosenSchedule.Time})`
    );

    // Mark schedule as booked
    setSchedules((prev) =>
      prev.map((s) =>
        s.Schedule_ID === selectedSchedule ? { ...s, Status: "Booked" } : s
      )
    );

    // Update booking list
    const updatedBookings = bookings.map((b) =>
      b.Booking_ID === selectedBooking.Booking_ID
        ? {
            ...b,
            Status: status,
            Assigned_Date: chosenSchedule.Date,
            Assigned_Time: chosenSchedule.Time,
          }
        : b
    );

    setBookings(updatedBookings);
    setSelectedBooking(null);
    setSelectedSchedule("");
    setStatus("");
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.Client_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.Lawyer_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        Assign Client Appointments (From Lawyer Schedules)
      </h2>

      {/* SELECT BOOKING */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Select Booking
        </label>
        <select
          value={selectedBooking?.Booking_ID || ""}
          onChange={(e) =>
            setSelectedBooking(
              bookings.find((b) => b.Booking_ID === e.target.value)
            )
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#83B582]"
        >
          <option value="">Select a Paid Booking</option>
          {bookings.map((b) => (
            <option key={b.Booking_ID} value={b.Booking_ID}>
              {b.Booking_ID} — {b.Client_Name} ({b.Lawyer_Name})
            </option>
          ))}
        </select>
      </div>

      {/* AUTO-FILLED INFO */}
      {selectedBooking && (
        <div className="border border-gray-200 rounded p-4 mb-4 bg-gray-50 text-sm text-gray-700">
          <p>
            <b>Client:</b> {selectedBooking.Client_Name}
          </p>
          <p>
            <b>Lawyer:</b> {selectedBooking.Lawyer_Name}
          </p>
          <p>
            <b>Case Type:</b> {selectedBooking.Case_Type}
          </p>
        </div>
      )}

      {/* SCHEDULE SELECTION */}
      {selectedBooking && (
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Select Available Schedule
          </label>
          <select
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#83B582]"
          >
            <option value="">Choose Date & Time</option>
            {availableSchedules.length > 0 ? (
              availableSchedules.map((s) => (
                <option key={s.Schedule_ID} value={s.Schedule_ID}>
                  {s.Date} — {s.Time}
                </option>
              ))
            ) : (
              <option disabled>No available schedules</option>
            )}
          </select>
        </div>
      )}

      {/* STATUS */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#83B582]"
        >
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        onClick={handleAssign}
        className="px-6 py-2 bg-[#83B582] text-black font-semibold rounded hover:bg-[#55a754]"
      >
        Assign Appointment
      </button>

      {/* SEARCH + TABLE */}
      <div className="flex justify-between items-center my-6">
        <input
          type="text"
          placeholder="Search client or lawyer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3 focus:border-[#83B582]"
        />
      </div>
<div className="overflow-x-auto mt-6">
  <table className="min-w-full border-collapse">
    <thead className="bg-[#83B582] text-white text-sm uppercase tracking-wide">
      <tr>
        <th className="px-5 py-3 text-left font-semibold">Booking ID</th>
        <th className="px-5 py-3 text-left font-semibold">Client</th>
        <th className="px-5 py-3 text-left font-semibold">Lawyer</th>
        <th className="px-5 py-3 text-left font-semibold">Case Type</th>
        <th className="px-5 py-3 text-left font-semibold">Status</th>
        <th className="px-5 py-3 text-left font-semibold">Appointment</th>
        <th className="px-5 py-3 text-left font-semibold">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white text-gray-800 text-sm">
      {filteredBookings.length > 0 ? (
        filteredBookings.map((b, i) => (
          <tr
            key={i}
            className={`transition-colors duration-200 ${
              i % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-[#f0f8f4]`}
          >
            <td className="px-5 py-3 font-medium text-gray-900">
              {b.Booking_ID}
            </td>
            <td className="px-5 py-3">{b.Client_Name}</td>
            <td className="px-5 py-3">{b.Lawyer_Name}</td>
            <td className="px-5 py-3">{b.Case_Type}</td>
            <td className="px-5 py-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  b.Status === "Scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : b.Status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {b.Status}
              </span>
            </td>
            <td className="px-5 py-3">
              {b.Assigned_Date ? (
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {b.Assigned_Date}
                  </p>
                  <p className="text-xs text-gray-500">{b.Assigned_Time}</p>
                </div>
              ) : (
                <span className="text-gray-400 text-xs">—</span>
              )}
            </td>
            <td className="px-5 py-3">
              {b.Status === "Scheduled" ? (
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Mark booking ${b.Booking_ID} as completed?`
                      )
                    ) {
                      const updated = bookings.map((x) =>
                        x.Booking_ID === b.Booking_ID
                          ? { ...x, Status: "Completed" }
                          : x
                      );
                      setBookings(updated);
                      alert(
                        `✅ Booking ${b.Booking_ID} has been marked as completed.`
                      );
                    }
                  }}
                  className="px-4 py-1.5 bg-[#83B582] text-black rounded-md text-xs font-semibold hover:bg-[#55a754] transition"
                >
                  Mark as Completed
                </button>
              ) : b.Status === "Completed" ? (
                <span className="text-xs text-green-700 font-semibold">
                   Completed
                </span>
              ) : (
                <span className="text-xs text-gray-500">—</span>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="text-center py-6 text-gray-500 text-sm bg-gray-50"
          >
            No appointments found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}
