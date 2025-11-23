const BASE_URL = "http://localhost:5000/api/bookings";

export const BookingAPI = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  create: async (data) => {
    const formData = new FormData();

    formData.append("CustomerID", data.CustomerID);
    formData.append("LawyerID", data.LawyerID);
    formData.append("Case_Title", data.Case_Title);
    formData.append("Case_Description", data.Case_Description);
    formData.append("Additional_Notes", data.Additional_Notes);

    if (data.Document) {
      formData.append("Document", data.Document);
    }

    const res = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    return result;
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return res.json();
  },

  getByCustomer: async (id) => {
    const res = await fetch(`${BASE_URL}/customer/${id}`);
    return res.json();
  },

  close: async (id) => {
    const res = await fetch(`${BASE_URL}/close/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
};
