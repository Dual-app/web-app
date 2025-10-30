import React, { useState, useEffect } from "react";
import { useLawyer } from "../hooks/LawyerHook";
import { useNavigate } from "react-router-dom";

export default function ClientBooking() {
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const [caseData, setCaseData] = useState({
    caseTitle: "",
    caseDescription: "",
    document: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { lawyers, fetchLawyers } = useLawyer();

  // Fetch lawyers
  useEffect(() => {
    fetchLawyers();
  }, []);

  // Filter lawyers by case type
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

  // Handle booking confirmation
  const handleBooking = () => {
    const newBookingId = `BKG-${Date.now()}`;
    const nextErrors = {};

    if (!clientName.trim()) nextErrors.clientName = "Full name is required.";
    if (!selectedCaseType) nextErrors.caseType = "Please select a case type.";
    if (!selectedLawyer) nextErrors.lawyer = "Please select a lawyer.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBookingId(newBookingId);
    setShowCaseForm(true);
  };

  // Handle Post-Case submission
  const handleCaseSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!caseData.caseTitle.trim())
      nextErrors.caseTitle = "Case title is required.";
    if (!caseData.caseDescription.trim())
      nextErrors.caseDescription = "Case description is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.log("Booking & Case Submitted:", {
      bookingId,
      clientName,
      selectedCaseType,
      selectedLawyer,
      notes,
      caseData,
    });

    alert(`✅ Booking ${bookingId} submitted successfully!`);
    navigate(`/top-up?bookingId=${bookingId}`);
  };

  const handleCaseChange = (e) => {
    const { name, value, files } = e.target;
    setCaseData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // ========== UI ==========
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-[#1A3636] mb-2">
            Book a Consultation
          </h1>
          <p className="text-gray-600">
            Select your case type and lawyer, then provide your case details.
          </p>
        </div>

        {/* STEP 1: BOOKING */}
        {!showCaseForm && (
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
                  className={`mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none ${
                    errors.clientName
                      ? "border-red-500"
                      : "focus:border-[#83B582] border-gray-300"
                  }`}
                />
                {errors.clientName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.clientName}
                  </p>
                )}
              </div>

              {/* Case Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Case Type
                </label>
                <select
                  value={selectedCaseType}
                  onChange={(e) => setSelectedCaseType(e.target.value)}
                  className={`mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none ${
                    errors.caseType
                      ? "border-red-500"
                      : "focus:border-[#83B582] border-gray-300"
                  }`}
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
                {errors.caseType && (
                  <p className="text-sm text-red-500 mt-1">{errors.caseType}</p>
                )}
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Provide any details for your booking..."
                  className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[#83B582] h-24"
                />
              </div>
            </div>

            {/* Lawyers List */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[#1A3636] mb-4">
                Select a Lawyer
              </h3>
              {filteredLawyers.length === 0 ? (
                <p className="text-gray-600">
                  No lawyers found for the selected case type.
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredLawyers.map((lawyer) => (
                    <div
                      key={lawyer.Lawyer_ID}
                      onClick={() => setSelectedLawyer(lawyer)}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
                        selectedLawyer?.Lawyer_ID === lawyer.Lawyer_ID
                          ? "border-[#83B582] bg-green-50"
                          : "border-gray-200 bg-white hover:border-[#83B582]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            lawyer.Lawyer_Photo ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt={lawyer.Lawyer_Name}
                          className="w-14 h-14 rounded-full object-cover border"
                        />
                        <div>
                          <h4 className="font-semibold text-[#1A3636]">
                            {lawyer.Lawyer_Name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {lawyer.Lawyer_Type} Lawyer
                          </p>
                          <p className="text-xs text-gray-500">
                            {lawyer.Lawyer_Address}
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-[#83B582] text-black rounded hover:bg-[#55a754]">
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              className="mt-6 w-full bg-[#83B582] text-black font-semibold py-2 rounded-lg hover:bg-[#55a754]"
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* STEP 2: POST CASE */}
        {showCaseForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold text-[#1A3636] mb-2">
              Case Details for Booking {bookingId}
            </h2>
            <p className="text-gray-600 mb-4">
              Provide your case details for the selected lawyer.
            </p>

            <form onSubmit={handleCaseSubmit}>
              {/* Case Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Case Title
                </label>
                <input
                  type="text"
                  name="caseTitle"
                  value={caseData.caseTitle}
                  onChange={handleCaseChange}
                  placeholder="Enter a short case title"
                  className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none ${
                    errors.caseTitle
                      ? "border-red-500"
                      : "focus:border-[#83B582] border-gray-300"
                  }`}
                />
                {errors.caseTitle && (
                  <p className="text-sm text-red-500 mt-1">{errors.caseTitle}</p>
                )}
              </div>

              {/* Case Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Case Description
                </label>
                <textarea
                  name="caseDescription"
                  value={caseData.caseDescription}
                  onChange={handleCaseChange}
                  placeholder="Describe your case clearly..."
                  className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none h-28 ${
                    errors.caseDescription
                      ? "border-red-500"
                      : "focus:border-[#83B582] border-gray-300"
                  }`}
                />
                {errors.caseDescription && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.caseDescription}
                  </p>
                )}
              </div>

              {/* Document Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Attach Document (optional)
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleCaseChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can attach contracts or evidence here.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#83B582] text-black font-semibold py-2 rounded-lg hover:bg-[#55a754]"
              >
                Submit Case
              </button>
            </form>
          </div>
        )}
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
