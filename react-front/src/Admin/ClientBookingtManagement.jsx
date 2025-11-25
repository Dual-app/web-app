import React, { useState, useEffect } from "react";
import { useBookings } from "../hooks/BookingHook";
import { LawyerScheduleAPI } from "../api/LawyerScheduleAPI";
import { BookingAPI } from "../api/BookingAPI";

export default function ClientBookingManagement() {
  const { bookings, setBookings, fetchBookings, assignSchedule } =
    useBookings();
  const [localBookings, setLocalBookings] = useState([]);

  const [schedules, setSchedules] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Load all bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  // Load schedules
  useEffect(() => {
    if (!selectedBooking) return;

    LawyerScheduleAPI.getAll()
      .then((all) => {
        const filtered = all.filter(
          (s) =>
            Number(s.Lawyer_ID) === Number(selectedBooking.LawyerID) &&
            s.Status === "Available"
        );
        setSchedules(filtered);
      })
      .catch(() => setSchedules([]));
  }, [selectedBooking]);

  const availableSchedules = schedules;

  const handleClose = async (bookingID) => {
    setLocalBookings((prev) =>
      prev.map((b) =>
        b.BookingID === bookingID ? { ...b, Status: "Closed" } : b
      )
    );

    await BookingAPI.close(bookingID); // now it works
    fetchBookings();
    alert(`Booking ${bookingID} has been closed.`);
  };

  const handleAssign = async () => {
    if (!selectedBooking || !selectedSchedule) {
      alert("Please select both booking and schedule.");
      return;
    }

    await assignSchedule(selectedBooking.BookingID, selectedSchedule);

    alert("✔ Schedule assigned successfully!");

    setSelectedBooking(null);
    setSelectedSchedule("");
  };

  // FIX: Avoid crash when Name fields do not exist
  const filteredBookings = bookings.filter((b) => {
    const client = b.Client_Name || "";
    const lawyer = b.Lawyer_Name || "";
    return (
      client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        Client Booking Management
      </h2>

      {/* Select booking */}
      <select
        value={selectedBooking?.BookingID || ""}
        onChange={(e) =>
          setSelectedBooking(
            bookings.find((b) => b.BookingID == e.target.value)
          )
        }
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Select a Paid Booking</option>

        {bookings
          .filter((b) => b.Status === "Pending")
          .map((b) => (
            <option key={b.BookingID} value={b.BookingID}>
              {b.BookingID}. {b.Case_Title} ( {b.Client_Name} - {b.Lawyer_Name}{" "}
              )
            </option>
          ))}
      </select>

      {/* Schedules */}
      {selectedBooking && (
        <>
          <label>Select Lawyer Schedule</label>
          <select
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">Choose schedule</option>

            {availableSchedules.map((s) => (
              <option key={s.Schedule_ID} value={s.Schedule_ID}>
                {s.Available_Date} — {s.Start_Time}
              </option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            className="px-6 py-2 bg-[#83B582] text-black font-semibold rounded"
          >
            Assign Schedule
          </button>
        </>
      )}

      {/* Bookings Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border">
          <thead className="bg-[#83B582] text-white">
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Lawyer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Case</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No bookings found.
                </td>
              </tr>
            ) : (
              localBookings.map((b) => (
                <tr key={b.BookingID} className="border-t">
                  <td className="px-4 py-2">{b.BookingID}</td>
                  <td>{b.Client_Name}</td>
                  <td>{b.Lawyer_Name}</td>
                  <td>
                    {b.ScheduleID ? `${b.Available_Date}` : "Not Assigned"}
                  </td>
                  <td className="px-4 py-2">
                    {b.ScheduleID ? (
                      <>
                        {b.Start_Time} — {b.End_Time}
                      </>
                    ) : (
                      <span className="text-gray-400">Not Assigned</span>
                    )}
                  </td>

                  <td className="px-4 py-2">{b.Case_Title}</td>
                  <td className="px-4 py-2">{b.Status}</td>
                  <td className="px-4 py-2">
                    {b.Status !== "Closed" ? (
                      <button
                        onClick={() => handleClose(b.BookingID)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Close Case
                      </button>
                    ) : (
                      <span className="text-gray-500">Closed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
