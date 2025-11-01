const BASE_URL = "http://localhost:5000/api/clients";

export const ClientAPI = {
  getAllClients: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },
  createClient: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      // Throw error with backend message
      throw new Error(result.message || "Failed to create client");
    }
    return result;
  },
  updateClient: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteClient: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return res.json();
  },
};
