import React, { useEffect, useState } from "react";

export default function AdminManagement() {
  const [admins, setAdmins] = useState(() => {
    const raw = localStorage.getItem("admins_v1");
    return raw ? JSON.parse(raw) : [];
  });

  const [form, setForm] = useState({
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
    localStorage.setItem("admins_v1", JSON.stringify(admins));
  }, [admins]);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  const STRONG_PW_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

  const validate = () => {
    if (!form.name || !form.email || (!form.id && !form.password)) {
      setFormError("All required fields must be filled.");
      return false;
    }
    if (!EMAIL_RE.test(form.email) || form.email.endsWith(".cmo")) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    if ((!form.id || form.password) && !STRONG_PW_RE.test(form.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include upper/lowercase, and a special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");
    setPasswordError("");

    if (!validate()) return;

    if (form.id) {
      setAdmins((prev) =>
        prev.map((a) =>
          a.id === form.id
            ? { ...a, name: form.name, email: form.email, phone: form.phone, address: form.address }
            : a
        )
      );
    } else {
      const nextId = admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1;
      setAdmins((prev) => [
        { id: nextId, name: form.name, email: form.email, phone: form.phone, address: form.address },
        ...prev,
      ]);
    }

    setForm({ id: null, name: "", email: "", password: "", phone: "", address: "" });
  };

  const handleEdit = (a) => {
    setForm({ id: a.id, name: a.name, email: a.email, password: "", phone: a.phone, address: a.address });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const filteredAdmins = admins.filter((a) =>
    a.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        {form.id ? "Edit Admin" : "Register New Admin"}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="form-control border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="form-control border rounded px-3 py-2"
          />
          {emailError && <small className="text-sm text-[#d9534f]">{emailError}</small>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={form.id ? "New Password (optional)" : "Admin Password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control border rounded px-3 py-2 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-2 flex items-center"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a18.87 18.87 0 013.81-4.685M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 9.943 6.975 6 12 6c1.38 0 2.667.214 3.835.605" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {passwordError && <small className="text-sm text-[#d9534f]">{passwordError}</small>}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="form-control border rounded px-3 py-2"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="form-control border rounded px-3 py-2 md:col-span-2"
          />
        </div>

        {formError && <p className="text-sm text-[#d9534f] mt-2">{formError}</p>}

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754]"
          >
            {form.id ? "Update Admin" : "Register Admin"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={() => setForm({ id: null, name: "", email: "", password: "", phone: "", address: "" })}
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
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-5">
                  No admins found.
                </td>
              </tr>
            ) : (
              filteredAdmins.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-2">{a.id}</td>
                  <td className="px-4 py-2">{a.name}</td>
                  <td className="px-4 py-2">{a.email}</td>
                  <td className="px-4 py-2">{a.phone || "—"}</td>
                  <td className="px-4 py-2">{a.address || "—"}</td>
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
                        onClick={() => handleDelete(a.id)}
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
 