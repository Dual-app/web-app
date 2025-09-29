import React from "react";

function LawBookManagement() {
  return (
    <>
      <div className="bg-white rounded-lg p-8 shadow-lg w-full">
        <h2 className="mb-5 text-[#83B582] text-xl font-semibold">
          Upload Law Book
        </h2>
        <form id="uploadForm" className="mb-2" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="title"
                className="form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none"
                placeholder="Book Title"
              />
              <small className="text-sm text-[#d9534f]">
                Book Title is required.
              </small>
            </div>
            <div>
              <input
                type="text"
                id="author"
                className="form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none"
                placeholder="Author"
              />
              <small className="text-sm text-[#d9534f]">
                Author is required.
              </small>
            </div>
            <div>
              <input
                type="number"
                id="year"
                className="form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none"
                placeholder="Year"
              />
              <small className="text-sm text-[#d9534f]">
                Enter a valid year.
              </small>
            </div>
            <div>
              <input
                type="text"
                id="category"
                className="form-control w-full border rounded px-3 py-2 focus:border-black focus:shadow-none"
                placeholder="Category"
              />
              <small className="text-sm text-[#d9534f]">
                Category is required.
              </small>
            </div>
            <div className="md:col-span-2">
              <input
                type="file"
                id="file"
                className="form-control w-full border rounded focus:border-black focus:shadow-none"
                accept=".pdf,.docx"
              />
              <small className="text-sm text-[#d9534f]">
                Only PDF or DOCX files allowed.
              </small>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-[#83B582] text-white font-semibold rounded hover:bg-[#55a754] flex items-center gap-2 border-none"
          >
            Upload Book
          </button>
        </form>

        <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
          <input
            type="text"
            id="searchInput"
            className="form-control w-full md:w-1/4 border rounded px-3 py-2 focus:border-black focus:shadow-none"
            placeholder="Search by Title..."
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
              <tr>
                <td className="px-4 py-2">Criminal Law Basics</td>
                <td className="px-4 py-2">Aung Min</td>
                <td className="px-4 py-2">2020</td>
                <td className="px-4 py-2">Criminal Law</td>
                <td className="px-4 py-2">PDF</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Corporate Regulations</td>
                <td className="px-4 py-2">Zaw Htet</td>
                <td className="px-4 py-2">2022</td>
                <td className="px-4 py-2">Corporate Law</td>
                <td className="px-4 py-2">DOCX</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LawBookManagement;
