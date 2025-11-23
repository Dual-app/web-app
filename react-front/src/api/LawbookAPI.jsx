const BASE_URL = "http://localhost:5000/api/lawbooks";

export const LawbookAPI = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },
  getOne: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
  },
  create: async (data) => {
    const formData = new FormData();

    formData.append("Title", data.Title);
    formData.append("Author", data.Author);
    formData.append("Year", data.Year);
    formData.append("Category", data.Category);
    formData.append("ShortPreview", data.ShortPreview);
    formData.append("file", data.file);

    const res = await fetch(BASE_URL, {
      method: "POST",
      body: formData, // IMPORTANT: no headers!
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

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
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
