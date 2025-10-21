import React, { useEffect, useState } from "react";

export default function LawyerPage() {
  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch lawyer data from backend
  useEffect(() => {
    fetch("http://localhost:5000/lawyers") // 🔁 update your API endpoint
      .then((res) => res.json())
      .then((data) => setLawyers(data))
      .catch((err) => console.error("Error fetching lawyers:", err));
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.Lawyer_Name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <div className="bg-[#1A3636] text-white py-10 text-center">
        <h1 className="text-3xl font-semibold mb-2">Our Professional Lawyers</h1>
        <p className="text-sm text-gray-200 max-w-xl mx-auto">
          Meet our dedicated legal experts — experienced, skilled, and ready to
          provide you with the best legal advice.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search by lawyer name..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[#83B582]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LAWYERS GRID */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredLawyers.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No lawyers found.
          </p>
        ) : (
          filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.Lawyer_ID}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Photo */}
              <img
                src={
                  lawyer.Lawyer_Photo ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt={lawyer.Lawyer_Name}
                className="w-full h-56 object-cover"
              />

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#1A3636]">
                  {lawyer.Lawyer_Name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  📍 {lawyer.Lawyer_Address}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  📞 {lawyer.Lawyer_Phone}
                </p>
                <p className="text-sm text-[#83B582] font-medium mb-3">
                  {lawyer.Lawyer_Type} Lawyer
                </p>

                <button
                  className="w-full bg-[#83B582] text-black font-medium py-2 rounded hover:bg-[#55a754] transition"
                  onClick={() => alert(`Booking consultation with ${lawyer.Lawyer_Name}`)}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
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
              © {new Date().getFullYear()} LegalEase Law Firm. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
