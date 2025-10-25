import React, { useState, useEffect } from "react";

function ClientAppointmentManagement() {
  const [formData, setFormData] = useState({
    bookingId: "",
    clientName: "",
    lawyerName: "",
    caseType: "",
    status: "",
    schedule: "",
  });

  const [formError, setFormError] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch appointments (from backend)
  useEffect(() => {
    fetch("http://localhost:5000/admin/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual field error
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.clientName.trim())
      errors.clientName = "Client Name is required.";
    if (!formData.lawyerName.trim())
      errors.lawyerName = "Lawyer Name is required.";
    if (!formData.caseType.trim())
      errors.caseType = "Case Type is required.";
    if (!formData.status.trim())
      errors.status = "Status is required.";
    if (!formData.schedule.trim())
      errors.schedule = "Schedule date/time required.";

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    if (editingIndex !== null) {
      // Update existing
      const updated = [...appointments];
      updated[editingIndex] = formData;
      setAppointments(updated);
      setEditingIndex(null);
    } else {
      // Add new
      setAppointments((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData({
      bookingId: "",
      clientName: "",
      lawyerName: "",
      caseType: "",
      status: "",
      schedule: "",
    });
    setFormError({});
  };

  // Edit existing appointment
  const handleEdit = (index) => {
    setFormData(appointments[index]);
    setEditingIndex(index);
  };

  // Delete appointment
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Filter for search
  const filteredAppointments = appointments.filter(
    (a) =>
      a.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.lawyerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        Manage Client Appointments
      </h2>

      {/* FORM SECTION */}
      <form id="appointmentForm" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Client Name */}
          <div>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className={`w-full border rounded px-3 py-2 focus:border-black ${
                formError.clientName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formError.clientName && (
              <small className="text-sm text-[#d9534f]">
                {formError.clientName}
              </small>
            )}
          </div>

          {/* Lawyer Name */}
          <div>
            <input
              type="text"
              name="lawyerName"
              value={formData.lawyerName}
              onChange={handleChange}
              placeholder="Lawyer Name"
              className={`w-full border rounded px-3 py-2 focus:border-black ${
                formError.lawyerName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formError.lawyerName && (
              <small className="text-sm text-[#d9534f]">
                {formError.lawyerName}
              </small>
            )}
          </div>

          {/* Case Type */}
          <div>
            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black ${
                formError.caseType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Case Type</option>
              <option value="Criminal">Criminal</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
              <option value="Corporate">Corporate</option>
              <option value="Insurance">Insurance</option>
              <option value="Property">Property</option>
              <option value="Immigration">Immigration</option>
            </select>
            {formError.caseType && (
              <small className="text-sm text-[#d9534f]">
                {formError.caseType}
              </small>
            )}
          </div>

          {/* Status */}
          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black ${
                formError.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Case Submitted">Case Submitted</option>
              <option value="Paid">Paid</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
            {formError.status && (
              <small className="text-sm text-[#d9534f]">
                {formError.status}
              </small>
            )}
          </div>

          {/* Schedule */}
          <div className="md:col-span-2">
            <input
              type="datetime-local"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black ${
                formError.schedule ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formError.schedule && (
              <small className="text-sm text-[#d9534f]">
                {formError.schedule}
              </small>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754]"
        >
          {editingIndex !== null ? "Update Appointment" : "Assign Appointment"}
        </button>
      </form>

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full md:w-1/4 focus:border-black"
          placeholder="Search by Client or Lawyer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-[#83B582] text-white">
            <tr>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Lawyer</th>
              <th className="px-4 py-2">Case Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Schedule</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{a.clientName}</td>
                  <td className="px-4 py-2">{a.lawyerName}</td>
                  <td className="px-4 py-2">{a.caseType}</td>
                  <td className="px-4 py-2">{a.status}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {new Date(a.schedule).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
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

export default ClientAppointmentManagement;
