import React, { useMemo, useState } from "react";

/**
 * Notify AdminTop via a window event.
 * AdminTop listens for "app:new-notification" and shows a bell + dropdown.
 */
function notify(type, title, message, href) {
  window.dispatchEvent(
    new CustomEvent("app:new-notification", {
      detail: { type, title, message, href, createdAt: Date.now() },
    })
  );
}

const LAWYERS = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Mary Johnson" },
  { id: "3", name: "David Smith" },
];

// Office window + lunch (in minutes after midnight)
const OFFICE_START = 9 * 60;      // 09:00
const OFFICE_END = 16 * 60;       // 16:00
const LUNCH_START = 12 * 60;      // 12:00
const LUNCH_END = 12 * 60 + 45;   // 12:45

export default function LawyerScheduleManagement() {
  const [formData, setFormData] = useState({
    lawyer: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [formError, setFormError] = useState(false);
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [conflictError, setConflictError] = useState("");

  const [schedules, setSchedules] = useState([
    // demo rows
    { id: 1, lawyer: "1", date: "2025-09-08", startTime: "10:00", endTime: "12:00", status: "Available" },
    { id: 2, lawyer: "2", date: "2025-09-09", startTime: "14:00", endTime: "16:00", status: "Available" },
  ]);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterLawyer, setFilterLawyer] = useState("");

  // Today (local) as YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  // Helpers
  const minutesFromHHMM = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const withinOffice = (startMins, endMins) =>
    startMins >= OFFICE_START && endMins <= OFFICE_END;

  const crossesLunch = (startMins, endMins) =>
    // any overlap with [LUNCH_START, LUNCH_END)
    !(endMins <= LUNCH_START || startMins >= LUNCH_END);

  const overlaps = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && aEnd > bStart;

  const hasScheduleConflict = (lawyer, date, startMins, endMins) => {
    return schedules.some((s) => {
      if (s.lawyer !== lawyer || s.date !== date) return false;
      const es = minutesFromHHMM(s.startTime);
      const ee = minutesFromHHMM(s.endTime);
      return overlaps(startMins, endMins, es, ee);
    });
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(false);
    if (timeError) setTimeError("");
    if (dateError) setDateError("");
    if (conflictError) setConflictError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lawyer, date, startTime, endTime } = formData;

    // Required
    if (!lawyer || !date || !startTime || !endTime) {
      setFormError(true);
      return;
    }

    // Date must be today or later
    if (date < todayStr) {
      setDateError("Date cannot be in the past.");
      return;
    }

    const startMins = minutesFromHHMM(startTime);
    const endMins = minutesFromHHMM(endTime);

    // Office hours check
    if (!withinOffice(startMins, endMins)) {
      setTimeError("Meetings must be between 09:00 and 16:00.");
      return;
    }

    // Block lunch overlap
    if (crossesLunch(startMins, endMins)) {
      setTimeError("The slot cannot include the lunch break (12:00–12:45).");
      return;
    }

    // Duration ≥ 30 mins
    if (endMins - startMins < 30) {
      setTimeError("End time must be at least 30 minutes after start time.");
      return;
    }

    // Conflict check (same lawyer + date + overlap)
    if (hasScheduleConflict(lawyer, date, startMins, endMins)) {
      const lawName = LAWYERS.find((l) => l.id === lawyer)?.name || `Lawyer #${lawyer}`;
      const msg = `${lawName} already has a schedule overlapping ${startTime}–${endTime} on ${date}. Please choose another time or date.`;
      setConflictError(msg);
      alert(msg); // message box
      return;
    }

    // Save (mock: add to local state)
    const newId = Date.now();
    const newRow = {
      id: newId,
      lawyer,
      date,
      startTime,
      endTime,
      status: "Available",
    };
    setSchedules((prev) => [newRow, ...prev]);

    // 🔔 Notify AdminTop
    const law = LAWYERS.find((l) => l.id === lawyer)?.name || `Lawyer #${lawyer}`;
    notify(
      "schedule",
      "New Schedule Added",
      `${law} — ${date} ${startTime}–${endTime}`,
      "/admin/schedules" // change to your route if needed
    );

    // Reset form + errors
    setFormData({ lawyer: "", date: "", startTime: "", endTime: "" });
    setFormError(false);
    setDateError("");
    setTimeError("");
    setConflictError("");
  };

  const handleDelete = (rowId) => {
    if (!window.confirm("Delete this schedule?")) return;
    setSchedules((prev) => prev.filter((r) => r.id !== rowId));
  };

  const handleEdit = (row) => {
    setFormData({
      lawyer: row.lawyer,
      date: row.date,
      startTime: row.startTime,
      endTime: row.endTime,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lawyerName = (id) => LAWYERS.find((l) => l.id === id)?.name || id;

  const filtered = schedules.filter((s) => {
    const matchSearch =
      !search ||
      lawyerName(s.lawyer).toLowerCase().includes(search.toLowerCase());
    const matchDate = !filterDate || s.date === filterDate;
    const matchLawyer = !filterLawyer || lawyerName(s.lawyer) === filterLawyer;
    return matchSearch && matchDate && matchLawyer;
  });

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">Register Lawyer’s Schedule</h2>

      <form className="mb-2" id="scheduleForm" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lawyer */}
          <div>
            <select
              id="lawyer"
              name="lawyer"
              value={formData.lawyer}
              onChange={handleChange}
              className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError && !formData.lawyer ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Lawyer</option>
              {LAWYERS.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
            {formError && !formData.lawyer && (
              <small className="text-sm text-[#d9534f]">Please select a lawyer.</small>
            )}
          </div>

          {/* Date */}
          <div>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={todayStr}
              className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                (formError && !formData.date) || dateError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formError && !formData.date && (
              <small className="text-sm text-[#d9534f]">Date is required.</small>
            )}
            {dateError && <small className="text-sm text-[#d9534f]">{dateError}</small>}
          </div>

          {/* Start */}
          <div>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              min="09:00"
              max="16:00"
              step="300" /* 5-min steps; adjust if you want 15 = 900 */
              className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError && !formData.startTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formError && !formData.startTime && (
              <small className="text-sm text-[#d9534f]">Start time is required.</small>
            )}
          </div>

          {/* End */}
          <div>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              min="09:00"
              max="16:00"
              step="300"
              className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                (formError && !formData.endTime) || timeError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formError && !formData.endTime && (
              <small className="text-sm text-[#d9534f]">End time is required.</small>
            )}
            {timeError && <small className="text-sm text-[#d9534f]">{timeError}</small>}
          </div>

          {/* Conflict inline message (if any) */}
          {conflictError && (
            <div className="md:col-span-2">
              <div className="p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">
                {conflictError}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754] flex items-center gap-2 border-none"
        >
          Add Schedule
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
        <input
          type="text"
          id="searchInput"
          className="form-control w-full md:w-1/4 border rounded px-3 py-2 focus:border-black focus:shadow-none"
          placeholder="Search by Lawyer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 w-full md:w-auto">
          <select
            id="dateFilter"
            className="form-control border rounded px-3 py-2 focus:border-black focus:shadow-none"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="">Filter by Date</option>
            {[...new Set(schedules.map((s) => s.date))].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            id="lawyerFilter"
            className="form-control border rounded px-3 py-2 focus:border-black focus:shadow-none"
            value={filterLawyer}
            onChange={(e) => setFilterLawyer(e.target.value)}
          >
            <option value="">Filter by Lawyer</option>
            {LAWYERS.map((l) => (
              <option key={l.id} value={l.name}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-[#83B582] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Lawyer</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No schedules found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-2">{lawyerName(row.lawyer)}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">{row.startTime}</td>
                  <td className="px-4 py-2">{row.endTime}</td>
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 items-center">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        onClick={() => handleEdit(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </button>
                    </div>
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
