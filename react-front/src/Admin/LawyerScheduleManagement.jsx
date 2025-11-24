import React, { useMemo, useState } from "react";
import { useLawyerSchedule } from "../hooks/LawyerScheduleHook";
import { useLawyer } from "../hooks/LawyerHook";

// 🔔 Admin notification system
function notify(type, title, message, href) {
  window.dispatchEvent(
    new CustomEvent("app:new-notification", {
      detail: { type, title, message, href, createdAt: Date.now() },
    })
  );
}

// Office hours + lunch break (minutes after midnight)
const OFFICE_START = 9 * 60;
const OFFICE_END = 16 * 60;
const LUNCH_START = 12 * 60;
const LUNCH_END = 12 * 60 + 45;

function LawyerScheduleManagement() {
  const [formData, setFormData] = useState({
    lawyer: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const { lawyers } = useLawyer();
  const LAWYERS = lawyers.map((l) => ({
    id: l.Lawyer_ID,
    name: l.Lawyer_Name,
  }));

  const { schedules, createSchedule, deleteSchedule, fetchSchedules } =
    useLawyerSchedule();

  const [formError, setFormError] = useState("");
  const [dateError, setDateError] = useState("");
  const [conflictError, setConflictError] = useState("");
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterLawyer, setFilterLawyer] = useState("");

  // Today (YYYY-MM-DD)
  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const checkSameDateConflict = (lawyerId, date) => {
    return schedules.some(
      (s) =>
        Number(s.Lawyer_ID) === Number(lawyerId) && s.Available_Date === date
    );
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    setDateError("");
    setConflictError("");
  };

  // --------------------------
  // SUBMIT HANDLER
  // --------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { lawyer, date, startTime, endTime } = formData;

    if (!lawyer || !date || !startTime || !endTime) {
      setFormError("⚠ Please fill all fields.");
      return;
    }

    // Prevent past dates
    if (date < todayStr) {
      setDateError("❌ Date cannot be in the past.");
      return;
    }

    // Check weekend
    const selected = new Date(date);
    if (selected.getDay() === 0 || selected.getDay() === 6) {
      setDateError("❌ Weekends are not allowed.");
      return;
    }

    // Prevent SAME LAWYER SAME DATE
    if (checkSameDateConflict(lawyer, date)) {
      setConflictError(
        "❌ This lawyer already has a schedule on this date. Please choose another date."
      );
      return;
    }

    // Create schedule
    await createSchedule({
      Lawyer_ID: lawyer,
      Available_Date: date,
      Start_Time: startTime,
      End_Time: endTime,
      Status: "Available",
    });

    const lawName = LAWYERS.find((l) => l.id === lawyer)?.name || "Lawyer";

    notify(
      "schedule",
      "New Schedule Added",
      `${lawName} — ${date} (${startTime}–${endTime})`,
      "/admin/schedules"
    );

    // Reset
    setFormData({
      lawyer: "",
      date: "",
      startTime: "",
      endTime: "",
    });

    fetchSchedules();
  };

  // Delete schedule
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;

    await deleteSchedule(id);

    notify(
      "schedule",
      "Schedule Deleted",
      `Schedule ID ${id} deleted.`,
      "/admin/schedules"
    );
  };

  // Edit schedule (scroll to top)
  const handleEdit = (row) => {
    setFormData({
      lawyer: row.Lawyer_ID,
      date: row.Available_Date,
      startTime: row.Start_Time,
      endTime: row.End_Time,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filters
  const filtered = schedules.filter((s) => {
    const name =
      LAWYERS.find((l) => l.id === s.Lawyer_ID)?.name.toLowerCase() || "";
    const matchSearch = !search || name.includes(search.toLowerCase());
    const matchDate = !filterDate || s.Available_Date === filterDate;
    const matchLawyer =
      !filterLawyer || Number(s.Lawyer_ID) === Number(filterLawyer);

    return matchSearch && matchDate && matchLawyer;
  });

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        Register Lawyer’s Schedule
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lawyer */}
          <select
            name="lawyer"
            value={formData.lawyer}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                lawyer: Number(e.target.value),
              }))
            }
            className={`border rounded px-3 py-2 ${
              formError && !formData.lawyer
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Lawyer</option>
            {LAWYERS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={formData.date}
            min={todayStr}
            onChange={(e) => {
              const d = new Date(e.target.value);
              const day = d.getDay();
              if (day === 0 || day === 6) {
                setDateError("❌ Weekend dates are not allowed.");
                setFormData((prev) => ({ ...prev, date: "" }));
                return;
              }
              handleChange(e);
            }}
            className={`border rounded px-3 py-2 ${
              dateError || (formError && !formData.date)
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {/* START TIME (ONLY 10AM) */}
          <select
            name="startTime"
            value={formData.startTime}
            onChange={(e) => {
              const start = e.target.value;
              if (!start) return;

              const [h, m] = start.split(":").map(Number);
              const end = new Date(0, 0, 0, h, m + 45)
                .toTimeString()
                .slice(0, 5);

              setFormData((prev) => ({
                ...prev,
                startTime: start,
                endTime: end,
              }));
            }}
            className={`border rounded px-3 py-2 ${
              formError && !formData.startTime
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Time</option>
            <option value="10:00">10:00 AM</option>
          </select>

          {/* END TIME (AUTO, READONLY) */}
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* ERRORS */}
        {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
        {dateError && <p className="text-red-600 text-sm mt-2">{dateError}</p>}
        {conflictError && (
          <p className="text-red-600 text-sm mt-2">{conflictError}</p>
        )}

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[#83B582] text-white rounded hover:bg-[#55a754]"
        >
          Add Schedule
        </button>
      </form>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4 my-4">
        <input
          type="text"
          placeholder="Search by Lawyer..."
          className="border rounded px-3 py-2 md:w-1/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Filter by Date</option>
            {[...new Set(schedules.map((s) => s.Available_Date))].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={filterLawyer}
            onChange={(e) => setFilterLawyer(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Filter by Lawyer</option>
            {LAWYERS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-[#83B582] text-white">
          <tr>
            <th className="px-4 py-2">Lawyer</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start</th>
            <th className="px-4 py-2">End</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No schedules found.
              </td>
            </tr>
          ) : (
            filtered.map((row) => (
              <tr key={row.Schedule_ID} className="border-t">
                <td className="px-4 py-2">
                  {LAWYERS.find((l) => l.id === row.Lawyer_ID)?.name}
                </td>
                <td className="px-4 py-2">{row.Available_Date}</td>
                <td className="px-4 py-2">{row.Start_Time}</td>
                <td className="px-4 py-2">{row.End_Time}</td>
                <td className="px-4 py-2">{row.Status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(row.Schedule_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LawyerScheduleManagement;
