import React, { useState, useEffect } from "react";
import { useLawyer } from "../hooks/LawyerHook";
import { useNavigate } from "react-router-dom";
import LoginAlertPopup from "../Components/LoginAlertPopup"; 

export default function ClientBooking() {
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");

  const { lawyers, fetchLawyers } = useLawyer();

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  // Fetch lawyers from backend
  useEffect(() => {
    fetchLawyers();
  }, []);

  // Filter lawyers based on case type
  useEffect(() => {
    if (selectedCaseType) {
      setFilteredLawyers(
        lawyers.filter((lawyer) => lawyer.Lawyer_Type === selectedCaseType)
      );
    } else {
      setFilteredLawyers([]);
    }
    setSelectedLawyer(null);
  }, [selectedCaseType, lawyers]);

  // Handle booking
  const handleBooking = () => {
    if (!clientName.trim()) {
      alert("Please enter your full name before booking.");
      return;
    }
    if (!selectedLawyer) {
      alert("Please select a lawyer.");
      return;
    }

    alert(
      `Booking request submitted!\n\nClient: ${clientName}\nLawyer: ${selectedLawyer.Lawyer_Name}\nCase Type: ${selectedCaseType}\nNotes: ${notes || "None"}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-[#1A3636] mb-2">
            Book a Consultation
          </h1>
          <p className="text-gray-600">
            Select your case type and choose a lawyer to book your consultation.
          </p>
        </div>

        {/* BOOKING FORM */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-[#1A3636] mb-4">
            Booking Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[#83B582]"
              />
            </div>

            {/* Case Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Case Type
              </label>
              <select
                value={selectedCaseType}
                onChange={(e) => setSelectedCaseType(e.target.value)}
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[#83B582]"
              >
                <option value="">Select Case Type</option>
                <option value="Criminal">Criminal</option>
                <option value="Business">Business</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Insurance">Insurance</option>
                <option value="Property">Property</option>
                <option value="Immigration">Immigration</option>
              </select>
            </div>

            {/* Selected Lawyer */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Selected Lawyer
              </label>
              <input
                type="text"
                value={selectedLawyer ? selectedLawyer.Lawyer_Name : ""}
                placeholder="No lawyer selected yet"
                readOnly
                className="mt-1 w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide any details or context for your case..."
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[#83B582] h-24"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleBooking}
              className="w-full bg-[#83B582] text-black font-semibold py-2 rounded-lg hover:bg-[#55a754] transition"
            >
              Confirm Booking
            </button>
            <p className="text-center text-sm text-gray-600 mt-3">
            Already booked before?{" "}
            <button
            onClick={() => navigate("/booking-history")}
            className="text-[#83B582] underline hover:text-[#55a754]"
            >
            View Booking History
        </button>
        </p>

          </div>
        </div>

        {/* LAWYERS LIST (Horizontal Rows) */}
        <div>
          <h2 className="text-xl font-semibold text-[#1A3636] mb-4">
            Available Lawyers
          </h2>

          {filteredLawyers.length === 0 ? (
            <p className="text-gray-600">
              No lawyers found for the selected case type.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.Lawyer_ID}
                  className={`flex items-center justify-between bg-white rounded-lg shadow-sm border hover:border-[#83B582] transition cursor-pointer p-4 ${
                    selectedLawyer?.Lawyer_ID === lawyer.Lawyer_ID
                      ? "border-2 border-[#83B582]"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedLawyer(lawyer)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        lawyer.Lawyer_Photo ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt={lawyer.Lawyer_Name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3636]">
                        {lawyer.Lawyer_Name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {lawyer.Lawyer_Type} Lawyer
                      </p>
                      <p className="text-xs text-gray-500">
                        {lawyer.Lawyer_Address}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLawyer(lawyer)}
                    className="px-4 py-1 bg-[#83B582] text-black font-medium rounded hover:bg-[#55a754] transition"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#83B582] text-black py-6 mt-12 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} LegalEase Law Firm. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
