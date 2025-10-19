const BASE_URL = "http://localhost:5000/api/admins";

export const AdminAPI = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },
  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      // Throw error with backend message
      throw new Error(result.message || "Failed to create admin");
    }
    return result;
  },
  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return res.json();
  },
};
