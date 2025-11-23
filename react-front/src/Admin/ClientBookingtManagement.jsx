import React, { useState, useEffect } from "react";

export default function ClientBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //---------------------------------------------------------
  // Fetch all client bookings (mock for now)
  //---------------------------------------------------------
  useEffect(() => {
    const mockBookings = [
      {
        Booking_ID: "BKG-001",
        Client_Name: "Mya Nandar",
        Lawyer_Name: "John Doe",
        Lawyer_ID: "L001",
        Case_Type: "Corporate",
        Payment_Status: "Paid",
      },
      {
        Booking_ID: "BKG-002",
        Client_Name: "David Lin",
        Lawyer_Name: "Jane Smith",
        Lawyer_ID: "L002",
        Case_Type: "Family",
        Payment_Status: "Pending",
      },
      {
        Booking_ID: "BKG-003",
        Client_Name: "Aye Chan",
        Lawyer_Name: "John Doe",
        Lawyer_ID: "L001",
        Case_Type: "Property",
        Payment_Status: "Paid",
      },
    ];

    setBookings(mockBookings);
  }, []);

  //---------------------------------------------------------
  // Fetch all lawyer schedules (mock for now)
  //---------------------------------------------------------
  useEffect(() => {
    const mockSchedules = [
      { Schedule_ID: "S001", Lawyer_ID: "L001", Date: "2025-11-10", Start: "10:00", Status: "Available" },
      { Schedule_ID: "S002", Lawyer_ID: "L001", Date: "2025-11-10", Start: "10:45", Status: "Available" },
      { Schedule_ID: "S003", Lawyer_ID: "L002", Date: "2025-11-11", Start: "10:00", Status: "Available" },
    ];
    setSchedules(mockSchedules);
  }, []);

  //---------------------------------------------------------
  // Filter schedules belonging to selected booking's lawyer
  //---------------------------------------------------------
  const availableSchedules = selectedBooking
    ? schedules.filter(
        (s) => s.Lawyer_ID === selectedBooking.Lawyer_ID && s.Status === "Available"
      )
    : [];

  //---------------------------------------------------------
  // Assign schedule to booking
  //---------------------------------------------------------
  const handleAssign = () => {
    if (!selectedBooking || !selectedSchedule) {
      alert("Please select a booking and a schedule.");
      return;
    }

    const chosen = schedules.find((s) => s.Schedule_ID === selectedSchedule);

    // Update booking with assigned schedule
    setBookings((prev) =>
      prev.map((b) =>
        b.Booking_ID === selectedBooking.Booking_ID
          ? {
              ...b,
              Assigned_Date: chosen.Date,
              Assigned_Time: chosen.Start,
            }
          : b
      )
    );

    // Mark schedule as used
    setSchedules((prev) =>
      prev.map((s) =>
        s.Schedule_ID === selectedSchedule ? { ...s, Status: "Booked" } : s
      )
    );

    alert(
      `✔ Schedule assigned!\n\nClient: ${selectedBooking.Client_Name}\nLawyer: ${selectedBooking.Lawyer_Name}\nTime: ${chosen.Date} at ${chosen.Start}`
    );

    setSelectedBooking(null);
    setSelectedSchedule("");
  };

  //---------------------------------------------------------
  // Search filters
  //---------------------------------------------------------
  const filteredBookings = bookings.filter(
    (b) =>
      b.Client_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.Lawyer_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        Client Booking Management
      </h2>

      {/* SELECT BOOKING */}

      <label className="block text-sm font-medium mb-1 text-gray-700">
        Select Paid Booking
      </label>

      <select
        value={selectedBooking?.Booking_ID || ""}
        onChange={(e) =>
          setSelectedBooking(
            bookings.find((b) => b.Booking_ID === e.target.value)
          )
        }
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">Select a booking</option>
        {bookings
          .filter((b) => b.Payment_Status === "Paid")
          .map((b) => (
            <option key={b.Booking_ID} value={b.Booking_ID}>
              {b.Booking_ID} — {b.Client_Name} ({b.Lawyer_Name})
            </option>
          ))}
      </select>

      {/* AUTO DETAILS OF SELECTED BOOKING */}
      {selectedBooking && (
        <div className="border border-gray-200 rounded p-4 bg-gray-50 mb-6">
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

      {/* SELECT SCHEDULE */}
      {selectedBooking && (
        <>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Assign Lawyer Schedule
          </label>
          <select
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
          >
            <option value="">Choose a schedule</option>
            {availableSchedules.length > 0 ? (
              availableSchedules.map((s) => (
                <option key={s.Schedule_ID} value={s.Schedule_ID}>
                  {s.Date} — {s.Start}
                </option>
              ))
            ) : (
              <option disabled>No available schedules</option>
            )}
          </select>

          <button
            onClick={handleAssign}
            className="px-6 py-2 bg-[#83B582] text-black font-semibold rounded hover:bg-[#55a754]"
          >
            Assign Schedule
          </button>
        </>
      )}

      {/* SEARCH */}
      <div className="mt-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by client or lawyer..."
          className="border px-3 py-2 rounded w-full md:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border">
          <thead className="bg-[#83B582] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Booking ID</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Lawyer</th>
              <th className="px-4 py-2 text-left">Case Type</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Assigned Schedule</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.Booking_ID} className="border-t">
                  <td className="px-4 py-2">{b.Booking_ID}</td>
                  <td className="px-4 py-2">{b.Client_Name}</td>
                  <td className="px-4 py-2">{b.Lawyer_Name}</td>
                  <td className="px-4 py-2">{b.Case_Type}</td>
                  <td className="px-4 py-2">{b.Payment_Status}</td>
                  <td className="px-4 py-2">
                    {b.Assigned_Date ? (
                      <>
                        {b.Assigned_Date} – {b.Assigned_Time}
                      </>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
