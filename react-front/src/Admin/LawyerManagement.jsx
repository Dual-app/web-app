import React, { useState, useEffect } from "react";
import { useLawyer } from "../hooks/LawyerHook";

function LawyerManagement() {
  // Destructure your hook functions
  const { lawyers, fetchLawyers, createLawyer, deleteLawyer, error } =
    useLawyer();

  // State for form inputs
  const [formData, setFormData] = useState({
    Lawyer_Name: "",
    Lawyer_Address: "",
    Lawyer_Phone: "",
    Lawyer_Type: "",
  });

  // Fetch existing lawyers on mount
  useEffect(() => {
    fetchLawyers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLawyer(formData);
    setFormData({
      Lawyer_Name: "",
      Lawyer_Address: "",
      Lawyer_Phone: "",
      Lawyer_Type: "",
    });
    fetchLawyers(); // refresh list
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lawyer?")) {
      await deleteLawyer(id);
      fetchLawyers();
    }
  };

  return (
    <>
      {/* Register Lawyer Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="mb-5 text-[#677D6A] font-semibold text-lg">
          Register New Lawyer
        </h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold bg-red-100 border border-red-300 rounded px-4 py-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="lawyerName" className="block font-medium mb-1">
              Lawyer Name
            </label>
            <input
              type="text"
              name="Lawyer_Name"
              value={formData.Lawyer_Name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="Lawyer_Address"
              value={formData.Lawyer_Address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="Lawyer_Phone"
              value={formData.Lawyer_Phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lawyerType" className="block font-medium mb-1">
              Type of Lawyer
            </label>
            <select
              name="Lawyer_Type"
              value={formData.Lawyer_Type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Criminal">Criminal</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
              <option value="Corporate">Corporate</option>
              <option value="Immigration">Immigration</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#83B582] hover:bg-[#55a754] text-white font-semibold px-6 py-2 rounded shadow"
          >
            Register Lawyer
          </button>
        </form>
      </div>

      {/* Existing Lawyers Table */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Existing Lawyers</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow overflow-hidden">
            <thead>
              <tr>
                <th className="bg-[#83B582] text-white text-left px-4 py-3">
                  ID
                </th>
                <th className="bg-[#83B582] text-white text-left px-4 py-3">
                  Name
                </th>
                <th className="bg-[#83B582] text-white text-left px-4 py-3">
                  Address
                </th>
                <th className="bg-[#83B582] text-white text-left px-4 py-3">
                  Phone
                </th>
                <th className="bg-[#83B582] text-white text-left px-4 py-3">
                  Type
                </th>
                <th className="bg-[#83B582] text-white text-left px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {lawyers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No lawyers found.
                  </td>
                </tr>
              ) : (
                lawyers.map((lawyer) => (
                  <tr key={lawyer.Lawyer_ID} className="border-t">
                    <td className="px-4 py-3">{lawyer.Lawyer_ID}</td>
                    <td className="px-4 py-3">{lawyer.Lawyer_Name}</td>
                    <td className="px-4 py-3">{lawyer.Lawyer_Address}</td>
                    <td className="px-4 py-3">{lawyer.Lawyer_Phone}</td>
                    <td className="px-4 py-3">{lawyer.Lawyer_Type}</td>
                    <td className="px-4 py-3">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded"
                        onClick={() => handleDelete(lawyer.Lawyer_ID)}
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
      </section>
    </>
  );
}

export default LawyerManagement;
