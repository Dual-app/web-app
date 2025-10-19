import React, { useEffect, useState } from "react";
import { useAdmin } from "../hooks/AdminHook";

export default function AdminManagement() {
  const { admins, fetchAdmins, createAdmin, deleteAdmin, updateAdmin, error } =
    useAdmin();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  console.log("Admins:", admins);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  const STRONG_PW_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

  const validate = () => {
    if (
      !formData.name ||
      !formData.email ||
      (!formData.id && !formData.password)
    ) {
      setFormError("All required fields must be filled.");
      return false;
    }
    if (!EMAIL_RE.test(formData.email) || formData.email.endsWith(".cmo")) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    if (
      (!formData.id || formData.password) &&
      !STRONG_PW_RE.test(formData.password)
    ) {
      setPasswordError(
        "Password must be at least 8 characters, include upper/lowercase, and a special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");
    setPasswordError("");
    if (!validate()) return;

    const adminData = {
      Admin_Name: formData.name,
      Admin_Email: formData.email,
      Admin_Password: formData.password,
      PhoneNumber: formData.phone,
      Address: formData.address,
      IsSuperAdmin : false,
    };

    try {
      if (formData.id) {
        await updateAdmin(formData.id, adminData);
      } else {
        await createAdmin(adminData);
      }
      setFormData({
        id: null,
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      setFormError(err.message || "An error occurred.");
    }
  };

  const handleEdit = (admin) => {

    setFormData({
      id: admin.Admin_ID,
      name: admin.Admin_Name,
      email: admin.Admin_Email,
      password: admin.Admin_Password ,
      phone: admin.PhoneNumber || "",
      address: admin.Address || "",
    });
    
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      await deleteAdmin(id);
    }
  };

  const filteredAdmins = admins.filter((a) =>
    a.Admin_Name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        {formData.id ? "Edit Admin" : "Register New Admin"}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-control border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-control border rounded px-3 py-2"
          />
          {emailError && (
            <small className="text-sm text-[#d9534f]">{emailError}</small>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={
                formData.id ? "New Password (optional)" : "Admin Password"
              }
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-control border rounded px-3 py-2 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-2 flex items-center"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a18.87 18.87 0 013.81-4.685M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 9.943 6.975 6 12 6c1.38 0 2.667.214 3.835.605"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <small className="text-sm text-[#d9534f]">{passwordError}</small>
          )}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="form-control border rounded px-3 py-2"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="form-control border rounded px-3 py-2 md:col-span-2"
          />
        </div>

        {formError && (
          <p className="text-sm text-[#d9534f] mt-2">{formError}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754]"
          >
            {formData.id ? "Update Admin" : "Register Admin"}
          </button>
          {formData.id && (
            <button
              type="button"
              onClick={() =>
                setFormData({
                  id: null,
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  address: "",
                })
              }
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="flex justify-between items-center my-6">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="form-control border rounded px-3 py-2 w-full md:w-1/2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden bg-white shadow">
          <thead className="bg-[#83B582] text-white">
            <tr>
              <th className="px-4 py-2 w-1/16">ID</th>
              <th className="px-4 py-2 w-2/16">Name</th>
              <th className="px-4 py-2 w-3/16">Email</th>
              <th className="px-4 py-2 w-3/16">Phone</th>
              <th className="px-4 py-2 w-3/16">Address</th>
              <th className="px-4 py-2 w-4/16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No admins found.
                </td>
              </tr>
            ) : (
              filteredAdmins.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-2 ">{a.Admin_ID}</td>
                  <td className="px-4 py-2">{a.Admin_Name}</td>
                  <td className="px-4 py-2">{a.Admin_Email}</td>
                  <td className="px-4 py-2">{a.PhoneNumber || "—"}</td>
                  <td className="px-4 py-2">{a.Address || "—"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 items-center flex-nowrap">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm whitespace-nowrap"
                        onClick={() => handleEdit(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm whitespace-nowrap"
                        onClick={() => handleDelete(a.Admin_ID)}
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
