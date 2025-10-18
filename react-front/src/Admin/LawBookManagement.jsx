import React, { useState } from "react";

function LawBookManagement() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    file: null,
  });

  const [formError, setFormError] = useState({}); // store errors

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear individual field error when user types
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission (Add / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.title.trim()) errors.title = "Book Title is required.";
    if (!formData.author.trim()) errors.author = "Author is required.";
    if (!formData.year || isNaN(formData.year)) errors.year = "Enter a valid year.";
    if (!formData.category.trim()) errors.category = "Category is required.";
    if (!formData.file) errors.file = "Only PDF or DOCX files allowed.";

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    //  Add or Update book
    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = formData;
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData({
      title: "",
      author: "",
      year: "",
      category: "",
      file: null,
    });
    setFormError({});
  };

  // 🗑️ Delete book
  const handleDelete = (index) => {
    setBooks((prev) => prev.filter((_, i) => i !== index));
  };

  // ✏️ Edit book
  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditingIndex(index);
  };

  // 🔍 Search filter (by title)
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-lg p-8 shadow-lg w-full">
        <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
          Register Law Book
        </h2>
        <form id="uploadForm" className="border-bottom" noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Book Title"
              />
              {formError.title && (
                <small className="text-sm text-[#d9534f]">{formError.title}</small>
              )}
            </div>

            <div>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError.author ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Author"
              />
              {formError.author && (
                <small className="text-sm text-[#d9534f]">{formError.author}</small>
              )}
            </div>

            <div>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError.year ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Year"
              />
              {formError.year && (
                <small className="text-sm text-[#d9534f]">{formError.year}</small>
              )}
            </div>

            <div>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                  formError.category ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Category"
              />
              {formError.category && (
                <small className="text-sm text-[#d9534f]">{formError.category}</small>
              )}
            </div>

            <div className="md:col-span-2">
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className={`form-control w-full border rounded focus:border-black focus:shadow-none ${
                  formError.file ? "border-red-500" : "border-gray-300"
                }`}
                accept=".pdf,.docx"
              />
              {formError.file && (
                <small className="text-sm text-[#d9534f]">{formError.file}</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754] flex items-center gap-2 border-none"
          >
            {editingIndex !== null ? "Update Book" : "Upload Book"}
          </button>
        </form>

        <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
          <input
            type="text"
            id="searchInput"
            className="form-control w-full md:w-1/4 border rounded px-3 py-2 focus:border-black focus:shadow-none"
            placeholder="Search by Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 w-full md:w-auto">
            <select
              id="yearFilter"
              className="form-control border rounded px-3 py-2 focus:border-black focus:shadow-none"
            >
              <option value="">Filter by Year</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </select>
            <select
              id="authorFilter"
              className="form-control border rounded px-3 py-2 focus:border-black focus:shadow-none"
            >
              <option value="">Filter by Author</option>
              <option>Aung Min</option>
              <option>Zaw Htet</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-[#83B582] text-white">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">File Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.year}</td>
                    <td className="px-4 py-2">{book.category}</td>
                    <td className="px-4 py-2">
                      {book.file?.name?.split(".").pop().toUpperCase()}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LawBookManagement;
