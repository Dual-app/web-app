import React, { useState, useEffect } from "react";
import { useLawyer } from "../hooks/LawyerHook";
import { notify } from "../utils/notify";

function LawyerManagement() {
  const {
    lawyers,
    fetchLawyers,
    createLawyer,
    deleteLawyer,
    updateLawyer,
    error,
  } = useLawyer();

  const [formData, setFormData] = useState({
    Lawyer_ID: "",
    Lawyer_Name: "",
    Lawyer_Address: "",
    Lawyer_Phone: "",
    Lawyer_Type: "",
    Lawyer_Photo: "", // NEW: base64 data URL
  });

  const [photoPreview, setPhotoPreview] = useState(""); // NEW: UI preview
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setPhotoError("❌ Only PNG or JPG files are allowed!");
      setPhotoPreview("");
      setFormData((prev) => ({ ...prev, Lawyer_Photo: "" }));
      return;
    }

    // Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("⚠️ File too large! Maximum size is 2MB.");
      setPhotoPreview("");
      setFormData((prev) => ({ ...prev, Lawyer_Photo: "" }));
      return;
    }

    setPhotoError("");

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, Lawyer_Photo: reader.result }));
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected photo
  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, Lawyer_Photo: "" }));
    setPhotoPreview("");
    setPhotoError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.Lawyer_Name.trim() ||
      !formData.Lawyer_Address.trim() ||
      !formData.Lawyer_Phone.trim() ||
      !formData.Lawyer_Type.trim()
    ) {
      setFormError("⚠️ All fields are required!");
      return;
    }

    setFormError("");

    if (editingId) {
      const { Lawyer_ID, ...updateData } = formData;
      await updateLawyer(Number(editingId), updateData);
      setEditingId(null);
    } else {
      const { Lawyer_ID, ...dataToCreate } = formData;
      await createLawyer(dataToCreate);
    }

    setFormData({
      Lawyer_ID: "",
      Lawyer_Name: "",
      Lawyer_Address: "",
      Lawyer_Phone: "",
      Lawyer_Type: "",
      Lawyer_Photo: "",
    });
    setPhotoPreview("");
    fetchLawyers();
  };

  const handleEdit = (lawyer) => {
    setFormData({
      Lawyer_ID: lawyer.Lawyer_ID,
      Lawyer_Name: lawyer.Lawyer_Name,
      Lawyer_Address: lawyer.Lawyer_Address,
      Lawyer_Phone: lawyer.Lawyer_Phone,
      Lawyer_Type: lawyer.Lawyer_Type,
      Lawyer_Photo: lawyer.Lawyer_Photo || "",
    });
    setPhotoPreview(lawyer.Lawyer_Photo || "");
    setEditingId(Number(lawyer.Lawyer_ID));
    setPhotoError("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this law book?")) {
      await deleteLawbook(id);
      fetchLawbooks();

      // If you delete the book you are currently editing, reset form
      if (editingIndex === id) {
        setEditingIndex(null);
        setFormData({
          Title: "",
          Author: "",
          Year: "",
          Category: "",
          ShortPreview: "",
          file: null,
        });
      }
    }
  };

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.Lawyer_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-lg p-8 shadow-lg w-full">
        <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
          {editingId ? "Edit Lawyer" : "Register New Lawyer"}
        </h2>

        {formError && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {formError}
          </div>
        )}
        {photoError && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {photoError}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form
          id="lawyerForm"
          className="border-bottom"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <input
                type="text"
                name="Lawyer_Name"
                value={formData.Lawyer_Name}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Lawyer_Name.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Lawyer Name"
              />
              {formError && !formData.Lawyer_Name.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Lawyer Name is required.
                </small>
              )}
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                name="Lawyer_Address"
                value={formData.Lawyer_Address}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Lawyer_Address.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Address"
              />
              {formError && !formData.Lawyer_Address.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Address is required.
                </small>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                name="Lawyer_Phone"
                value={formData.Lawyer_Phone}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Lawyer_Phone.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Phone Number"
              />
              {formError && !formData.Lawyer_Phone.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Phone Number is required.
                </small>
              )}
            </div>

            {/* Type */}
            <div>
              <select
                name="Lawyer_Type"
                value={formData.Lawyer_Type}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Lawyer_Type.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Criminal">Criminal</option>
                <option value="Business">Business</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Insurance">Insurance</option>
                <option value="Property">Property</option>
                <option value="Immigration">Immigration</option>
              </select>
              {formError && !formData.Lawyer_Type.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Type of Lawyer is required.
                </small>
              )}
            </div>

          </div>

          <button
            type="submit"
            className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754] flex items-center gap-2 border-none"
          >
            {editingId ? "Update Lawyer" : "Register Lawyer"}
          </button>
        </form>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Name..."
            className="form-control border rounded px-3 py-2 w-full md:w-1/3 focus:border-black focus:shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden bg-white shadow">
            <thead className="bg-[#83B582] text-white w-full">
              <tr>
                <th className="px-4 py-2 w-1/12">ID</th>
                <th className="px-4 py-2 w-2/12">Name</th>
                <th className="px-4 py-2 w-3/12">Address</th>
                <th className="px-4 py-2 w-2/12">Phone</th>
                <th className="px-4 py-2 w-1/12">Type</th>
                <th className="px-4 py-2 w-3/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLawyers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No lawyers found.
                  </td>
                </tr>
              ) : (
                filteredLawyers.map((lawyer) => (
                  <tr key={lawyer.Lawyer_ID} className="border-t">
                    <td className="px-4 py-2">{lawyer.Lawyer_ID}</td>
                    <td className="px-4 py-2">{lawyer.Lawyer_Name}</td>
                    <td className="px-4 py-2">{lawyer.Lawyer_Address}</td>
                    <td className="px-4 py-2">{lawyer.Lawyer_Phone}</td>
                    <td className="px-4 py-2">{lawyer.Lawyer_Type}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        onClick={() => handleEdit(lawyer)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
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
      </div>
    </>
  );
}

export default LawyerManagement;
