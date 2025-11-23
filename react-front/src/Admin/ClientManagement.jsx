import React, { useState } from "react";
import { useClient } from "../hooks/ClientHook";
import { useEffect } from "react";

export default function ClientManagement() {
  const { clients, loading, error, deleteClient, fetchClients } = useClient();
  const [searchName, setSearchName] = useState("");
  const [formData, setFormData] = useState({
    Client_Name: "",
    Client_Email: "",
    Client_Password: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.Client_Name.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      await deleteAdmin(id);
    }
  };

return (
    <div>
        <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
            <input
                type="text"
                id="searchInput"
                className="border rounded px-3 py-2 w-full md:w-1/4 focus:border-black focus:shadow-none"
                placeholder="Search by Name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Client Management</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
                <thead className="bg-[#83B582] text-white">
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Client Name </th>
                        <th className="py-2 px-4 border-b">Client Email</th>
                        <th className="py-2 px-4 border-b">Phone Number</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center py-4">
                                No clients found.
                            </td>
                        </tr>
                    ) : (
                        filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td className="py-2 px-4 border-b">{client.Client_ID}</td>
                                <td className="py-2 px-4 border-b">{client.Client_Name}</td>
                                <td className="py-2 px-4 border-b">{client.Client_Email}</td>                  
                                <td className="py-2 px-4 border-b">
                                    {client.Client_Phone || "Unregistered"}
                                </td>        
                                <td className="py-2 px-4 border-b">
                                    <div className="flex gap-2 items-center flex-nowrap">
                                    <button
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm whitespace-nowrap"
                                        disabled
                                    >
                                        Reset 
                                    </button>
                                    <button
                                        onClick={() => handleDelete(client.id)}
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
);
}
