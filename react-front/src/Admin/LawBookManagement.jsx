import React, { useState } from "react";
import { useLawbooks } from "../hooks/LawbookHook";

function LawBookManagement() {
  const { createLawbook, updateLawbook, deleteLawbook } = useLawbooks();

  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Year: "",
    Category: "",
    ShortPreview: "",
    FilePath: "example",
  });

  const [formError, setFormError] = useState({});
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    let errors = {};
    if (!formData.Title) errors.Title = "Title is required";
    if (!formData.Author) errors.Author = "Author is required";
    if (!formData.Year) errors.Year = "Year is required";
    if (!formData.Category) errors.Category = "Category is required";
    if (!formData.ShortPreview) errors.ShortPreview = "Preview is required";
    if (!formData.FilePath) errors.FilePath = "File is required";

    setFormError(errors);
    if (Object.keys(errors).length > 0) return;

    if (editingIndex !== null) {
      // Update existing book
      updateLawbook(books[editingIndex].id, formData);
      setEditingIndex(null);
    } else {
      // Create new book
      createLawbook(formData);
    }

    console.log("Submitted:", formData);

    // Reset form
    setFormData({
      Title: "",
      Author: "",
      Year: "",
      Category: "",
      ShortPreview: "",
      FilePath: "example",
    });
    setFormError({});
  };

  const handleDelete = (index) => {
    deleteLawbook(books[index].id);
  };

  const handleEdit = (index) => {
    const book = books[index];
    setFormData({
      Title: book.title,
      Author: book.author,
      Year: book.year,
      Category: book.category,
      ShortPreview: book.preview,
      FilePath: "example", // File cannot be pre-filled
    });
    setEditingIndex(index);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full">
      <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
        Register Law Book
      </h2>

      <form id="uploadForm" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError.Title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Book Title"
            />
            {formError.Title && (
              <small className="text-sm text-[#d9534f]">
                {formError.Title}
              </small>
            )}
          </div>

          {/* Author */}
          <div>
            <input
              type="text"
              name="Author"
              value={formData.Author}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError.Author ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Author"
            />
            {formError.Author && (
              <small className="text-sm text-[#d9534f]">
                {formError.Author}
              </small>
            )}
          </div>

          {/* Year */}
          <div>
            <input
              type="number"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError.Year ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Year"
            />
            {formError.Year && (
              <small className="text-sm text-[#d9534f]">{formError.Year}</small>
            )}
          </div>

          {/* Category */}
          <div>
            <input
              type="text"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError.Category ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Category"
            />
            {formError.Category && (
              <small className="text-sm text-[#d9534f]">
                {formError.Category}
              </small>
            )}
          </div>

          {/* Preview Text */}
          <div className="md:col-span-2">
            <textarea
              name="ShortPreview"
              value={formData.ShortPreview}
              onChange={handleChange}
              placeholder="Short preview or summary of the law book..."
              className={`w-full border rounded px-3 py-2 focus:border-black focus:shadow-none ${
                formError.ShortPreview ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
            />
            {formError.ShortPreview && (
              <small className="text-sm text-[#d9534f]">
                {formError.ShortPreview}
              </small>
            )}
          </div>

          {/* File Upload */}
          <div className="md:col-span-2">
            <input
              type="file"
              name="FilePath"
              onChange={handleChange}
              className={`w-full border rounded focus:border-black focus:shadow-none ${
                formError.FilePath ? "border-red-500" : "border-gray-300"
              }`}
              accept=".pdf,.docx"
            />
            {formError.FilePath && (
              <small className="text-sm text-[#d9534f]">{formError.FilePath}</small>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="my-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754]"
        >
          {editingIndex !== null ? "Update Book" : "Upload Book"}
        </button>
      </form>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
        <input
          type="text"
          id="searchInput"
          className="border rounded px-3 py-2 w-full md:w-1/4 focus:border-black focus:shadow-none"
          placeholder="Search by Title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-[#83B582] text-white">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Preview</th>
              <th className="px-4 py-2">File Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{book.Title}</td>
                  <td className="px-4 py-2">{book.Author}</td>
                  <td className="px-4 py-2">{book.Year}</td>
                  <td className="px-4 py-2">{book.Category}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {book.preview.length > 40
                      ? book.preview.slice(0, 40) + "..."
                      : book.preview}
                  </td>
                  <td className="px-4 py-2">
                    {book.FilePath?.name?.split(".").pop().toUpperCase()}
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
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LawBookManagement;
