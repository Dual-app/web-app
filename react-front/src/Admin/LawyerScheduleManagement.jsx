import React, { useState } from "react";

function LawyerScheduleManagement() {
  const [formData, setFormData] = useState({
    lawyer: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [formError, setFormError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formError) {
      setFormError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lawyer, date, startTime, endTime } = formData;

    if (!lawyer || !date || !startTime || !endTime) {
      setFormError(true);
      return;
    }

    setFormError(false);

    console.log("Schedule submitted:", formData);

    setFormData({
      lawyer: "",
      date: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg p-8 shadow-lg w-full">
        <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
          Register Lawyer’s Schedule
        </h2>
        <form className="border-bottom" id="scheduleForm" noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="1">John Doe</option>
                <option value="2">Mary Johnson</option>
                <option value="3">David Smith</option>
              </select>
              {formError && !formData.lawyer && (
                <small className="text-sm text-[#d9534f]">Please select a lawyer.</small>
              )}
            </div>
            <div>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formError && !formData.date && (
                <small className="text-sm text-[#d9534f]">Date is required.</small>
              )}
            </div>
            <div>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.startTime ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formError && !formData.startTime && (
                <small className="text-sm text-[#d9534f]">Start time is required.</small>
              )}
            </div>
            <div>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.endTime ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formError && !formData.endTime && (
                <small className="text-sm text-[#d9534f]">End time is required.</small>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754] flex items-center gap-2 border-none"
          >
            Add Schedule
          </button>
        </form>

        <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
          <input
            type="text"
            id="searchInput"
            className="form-control w-full md:w-1/4 border rounded px-3 py-2 focus:border-black focus:shadow-none"
            placeholder="Search by Lawyer..."
          />
          <div className="flex gap-2 w-full md:w-auto">
            <select
              id="dateFilter"
              className="form-control border rounded px-3 py-2 focus:border-black focus:shadow-none text-md"
            >
              <option value="">Filter by Date</option>
              <option>2025-09-08</option>
              <option>2025-09-09</option>
            </select>
            <select
              id="lawyerFilter"
              className="form-control border rounded px-3 py-2 focus:border-black focus:shadow-none"
            >
              <option value="">Filter by Lawyer</option>
              <option>John Doe</option>
              <option>Mary Johnson</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-[#83B582] text-white">
              <tr>
                <th className="px-4 py-2">Lawyer</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">2025-09-08</td>
                <td className="px-4 py-2">10:00</td>
                <td className="px-4 py-2">12:00</td>
                <td className="px-4 py-2">Available</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Mary Johnson</td>
                <td className="px-4 py-2">2025-09-09</td>
                <td className="px-4 py-2">14:00</td>
                <td className="px-4 py-2">16:00</td>
                <td className="px-4 py-2">Available</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LawyerScheduleManagement;
