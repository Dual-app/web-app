import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Postcase() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // Comes from Booking or History Page
  const clientId = localStorage.getItem("clientId") || "CL-0001";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookingId: bookingId || "",
    clientId,
    caseTitle: "",
    caseDescription: "",
    caseCategory: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!clientId) {
      navigate("/login");
    }
  }, [clientId, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!formData.caseTitle.trim())
      nextErrors.caseTitle = "Case title is required.";
    if (!formData.caseDescription.trim())
      nextErrors.caseDescription = "Case description is required.";
    if (!formData.caseCategory.trim())
      nextErrors.caseCategory = "Please select your case category.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // Simulate backend submission
      console.log("Case Submitted:", formData);
      setSuccess(true);

      // Simulate saving and then redirect to payment
      setTimeout(() => {
        navigate(`/top-up?bookingId=${formData.bookingId}`);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center text-[#1A3636] mb-2">
          Submit Case Details
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please provide details about your case to help the lawyer prepare for your consultation.
        </p>

        {success ? (
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-700">
              Case Submitted Successfully!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Redirecting to payment page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Hidden Booking ID */}
            <input type="hidden" name="bookingId" value={formData.bookingId} />

            {/* Case Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Case Title
              </label>
              <input
                type="text"
                name="caseTitle"
                value={formData.caseTitle}
                onChange={handleChange}
                placeholder="Enter a short case title"
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                  errors.caseTitle ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.caseTitle && (
                <p className="text-sm text-red-500 mt-1">{errors.caseTitle}</p>
              )}
            </div>

            {/* Case Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Case Category
              </label>
              <select
                name="caseCategory"
                value={formData.caseCategory}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                  errors.caseCategory ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                <option value="Criminal">Criminal</option>
                <option value="Business">Business</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Insurance">Insurance</option>
                <option value="Property">Property</option>
                <option value="Immigration">Immigration</option>
              </select>
              {errors.caseCategory && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.caseCategory}
                </p>
              )}
            </div>

            {/* Case Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Case Description
              </label>
              <textarea
                name="caseDescription"
                value={formData.caseDescription}
                onChange={handleChange}
                placeholder="Describe your case clearly for the lawyer..."
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] h-28 ${
                  errors.caseDescription ? "border-red-500" : "border-gray-300"
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
                Attach Documents (optional)
              </label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can attach case files, contracts, or evidence if necessary.
              </p>
            </div>

            {/* Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-6 text-sm text-gray-600">
              ⚖️ <b>Note:</b> After submitting your case, you’ll be redirected to complete
              your payment to confirm your consultation.
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded bg-[#83B582] py-2 text-black font-semibold hover:bg-[#55a754]"
            >
              Submit Case
            </button>

            {/* Payment Shortcut */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Already submitted your case?{" "}
                <button
                  onClick={() => navigate(`/top-up?bookingId=${bookingId}`)}
                  type="button"
                  className="text-[#83B582] underline hover:text-[#55a754]"
                >
                  Proceed to Payment
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
