import React, { useState, useEffect } from "react";

function ClientManagement() {
  const {
    clients,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    error,
  } = useClient();

  const [formData, setFormData] = useState({
    Client_ID: "",
    Full_Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.Full_Name.trim() ||
      !formData.Email.trim() ||
      !formData.Phone.trim() ||
      !formData.Password.trim()
    ) {
      setFormError("⚠️ All fields are required!");
      return;
    }

    // Email pattern
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(formData.Email)) {
      setFormError("⚠️ Please enter a valid email address.");
      return;
    }

    // Password strength
    if (formData.Password.length < 6) {
      setFormError("⚠️ Password must be at least 6 characters long.");
      return;
    }

    setFormError("");

    if (editingId) {
      const { Client_ID, ...updateData } = formData;
      await updateClient(Number(editingId), updateData);
      setEditingId(null);
    } else {
      const { Client_ID, ...dataToCreate } = formData;
      await createClient(dataToCreate);
    }

    setFormData({
      Client_ID: "",
      Full_Name: "",
      Email: "",
      Phone: "",
      Password: "",
    });
    fetchClients();
  };

  const handleEdit = (client) => {
    setFormData({
      Client_ID: client.Client_ID,
      Full_Name: client.Full_Name,
      Email: client.Email,
      Phone: client.Phone,
      Password: client.Password,
    });
    setEditingId(Number(client.Client_ID));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
      fetchClients();
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          Client_ID: "",
          Full_Name: "",
          Email: "",
          Phone: "",
          Password: "",
        });
      }
    }
  };

  // Search
  const filteredClients = clients.filter((client) =>
    client.Full_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-lg p-8 shadow-lg w-full">
        <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
          {editingId ? "Edit Client" : "Register New Client"}
        </h2>

        {formError && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {formError}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          id="clientForm"
          className="border-bottom"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="Full_Name"
                value={formData.Full_Name}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Full_Name.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Full Name"
              />
              {formError && !formData.Full_Name.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Full Name is required.
                </small>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Email.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Email Address"
              />
              {formError && !formData.Email.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Email is required.
                </small>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Phone.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Phone Number"
              />
              {formError && !formData.Phone.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Phone number is required.
                </small>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError && !formData.Password.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Password"
              />
              {formError && !formData.Password.trim() && (
                <small className="text-sm text-[#d9534f]">
                  Password is required.
                </small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754] flex items-center gap-2 border-none"
          >
            {editingId ? "Update Client" : "Register Client"}
          </button>
        </form>

        {/* SEARCH */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Name..."
            className="form-control border rounded px-3 py-2 w-full md:w-1/3 focus:border-black focus:shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden bg-white shadow">
            <thead className="bg-[#83B582] text-white w-full">
              <tr>
                <th className="px-4 py-2 w-1/12">ID</th>
                <th className="px-4 py-2 w-2/12">Full Name</th>
                <th className="px-4 py-2 w-3/12">Email</th>
                <th className="px-4 py-2 w-2/12">Phone</th>
                <th className="px-4 py-2 w-2/12">Password</th>
                <th className="px-4 py-2 w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.Client_ID} className="border-t">
                    <td className="px-4 py-2">{client.Client_ID}</td>
                    <td className="px-4 py-2">{client.Full_Name}</td>
                    <td className="px-4 py-2">{client.Email}</td>
                    <td className="px-4 py-2">{client.Phone}</td>
                    <td className="px-4 py-2">{client.Password}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        onClick={() => handleEdit(client)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        onClick={() => handleDelete(client.Client_ID)}
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

export default ClientManagement;
