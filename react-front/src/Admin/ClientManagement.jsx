import React, { useState, useEffect } from "react";
import { useClient } from "../hooks/ClientHook";

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
      setFormError(" All fields are required!");
      return;
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(formData.Email)) {
      setFormError(" Please enter a valid email address.");
      return;
    }

    if (formData.Password.length < 7) {
      setFormError(" Password must be at least 7 characters long.");
      return;
    }

    setFormError("");

    // FIX: Map form fields to your table fields
    // Your table uses Client_Name, Client_Email, Client_Password
    // So we save them in that format
    if (editingId) {
      await updateClient(Number(editingId), {
        Client_Name: formData.Full_Name,
        Client_Email: formData.Email,
        Client_Password: formData.Phone, // Phone stored here in your design
      });
      setEditingId(null);
    } else {
      await createClient({
        Client_Name: formData.Full_Name,
        Client_Email: formData.Email,
        Client_Password: formData.Phone, // Phone stored here in your table
      });
    }

    // Reset form
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
      Full_Name: client.Client_Name,
      Email: client.Client_Email,
      Phone: client.Client_Password, // Phone is stored here
      Password: "1234567", // required but not used
    });
    setEditingId(Number(client.Client_ID));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
      fetchClients();
    }
  };

  // Search (Client_Name is your table field)
  const filteredClients = clients.filter((client) =>
    client.Client_Name.toLowerCase().includes(searchTerm.toLowerCase())
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
                className={`form-control w-full border rounded px-3 py-2`}
                placeholder="Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="form-control w-full border rounded px-3 py-2"
                placeholder="Email Address"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                className="form-control w-full border rounded px-3 py-2"
                placeholder="Phone Number"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                className="form-control w-full border rounded px-3 py-2"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754]"
          >
            {editingId ? "Update Client" : "Register Client"}
          </button>
        </form>

        {/* SEARCH */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Name..."
            className="form-control border rounded px-3 py-2 w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-[#83B582] text-white">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Client Name</th>
                <th className="py-2 px-4 border-b">Client Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.Client_ID}>
                    <td className="py-2 px-4 border-b">{client.Client_ID}</td>
                    <td className="py-2 px-4 border-b">{client.Client_Name}</td>
                    <td className="py-2 px-4 border-b">{client.Client_Email}</td>
                    <td className="py-2 px-4 border-b">
                      {client.Client_Password || "Unregistered"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex gap-2 items-center flex-nowrap">
                        <button
                          onClick={() => handleDelete(client.Client_ID)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
    </>
  );
}

export default ClientManagement;
