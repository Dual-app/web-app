import React, { useEffect, useState } from "react";
import { useLawbooks } from "../hooks/LawbookHook";
import CustomerNav from "../Components/CustomerNav";

export default function LawBookPage() {
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(null);
  const [books, setBooks] = useState([]);

  const { lawbooks, loading, error } = useLawbooks();

  useEffect(() => {
    const enriched = (lawbooks ?? []).map((book) => ({
      ...book,
      fileUrl: book.FilePath ? `http://localhost:5000${book.FilePath}` : null,
    }));

    setBooks(enriched);
  }, [lawbooks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading law books...</p>
      </div>
    );
  }

  // Filter using Title
  const filteredBooks = (Array.isArray(books) ? books : []).filter((book) => {
    const title = book?.Title ?? "";
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <CustomerNav /> 
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-[#1A3636] text-white py-12 text-center">
        <h1 className="text-3xl font-semibold mb-2">Law Books Library</h1>
        <p className="text-sm text-gray-200 max-w-xl mx-auto">
          Explore our collection of legal resources and case references curated
          by professional lawyers.
        </p>
      </header>

      {/* SEARCH BAR */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search by book title..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[#83B582]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BOOK LIST */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No books found.</p>
        ) : (
          <div className="space-y-8">
            {filteredBooks.map((book, index) => {
              const fileUrl = book.FilePath
                ? `http://localhost:5000${book.FilePath}`
                : null;

              return (
                <div
                  key={book.Lawbook_ID || index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
                >
                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-[#1A3636] mb-2">
                    {book.Title}
                  </h2>

                  {/* Preview Text */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {book.ShortPreview?.length > 250
                      ? book.ShortPreview.slice(0, 250) + "..."
                      : book.ShortPreview || "No preview available."}
                  </p>

                  {/* Author, Year, Category */}
                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-4">
                    <span>
                      👤 <strong>{book.Author}</strong>
                    </span>
                    <span>📅 {book.Year}</span>
                    <span className="text-[#83B582] font-medium">
                      {book.Category}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        setOpenPreview(openPreview === index ? null : index)
                      }
                      className="flex-1 rounded bg-[#1A3636] text-white py-2 font-medium hover:bg-[#2d5656] transition"
                    >
                      {openPreview === index ? "Hide Preview" : "Preview"}
                    </button>

                    <a
                      href={book.fileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded bg-[#83B582] text-black py-2 font-medium text-center hover:bg-[#55a754] transition"
                    >
                      Download PDF
                    </a>
                  </div>

                  {/* Collapsible PDF Preview */}
                  {openPreview === index && (
                    <div className="mt-6 p-5 rounded-2xl bg-white/60 backdrop-blur-sm shadow-xl border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Preview — {book.Title}
                      </h3>
                      {book.fileUrl ? (
                        <iframe
                          src={`${book.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-96 rounded-lg"
                          style={{ border: "none" }}
                        ></iframe>
                      ) : (
                        <p className="text-center text-gray-500 py-6">
                          Preview unavailable.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#83B582] text-black py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold">LegalEase Law Firm</h3>
          <p className="text-sm text-black/80 mt-1">
            Yangon Main Office — 123 Pyay Road, Yangon, Myanmar
          </p>
          <p className="text-sm text-black/80">📞 +95 9 123 456 789</p>
          <p className="text-sm text-black/80">✉️ contact@legalease.com</p>
          <div className="border-t border-black/20 mt-4 pt-3">
            <p className="text-xs text-black/70">
              © {new Date().getFullYear()} LegalEase Law Firm. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
      </div>
  );
}
