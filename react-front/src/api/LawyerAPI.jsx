const BASE_URL = "http://localhost:5000/api/lawyers";

export const LawyerAPI = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
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
