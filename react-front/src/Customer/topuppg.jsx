import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topup() {
  const navigate = useNavigate();

  // Auto-get Client ID (example: from localStorage after login)
  const clientId = localStorage.getItem("clientId") || "CL-0001"; // fallback ID for testing

  const [formData, setFormData] = useState({
    clientId: clientId, // hidden but included in backend
    fullName: "",
    email: "",
    consultationType: "",
    amount: 200,
    paymentMethod: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!formData.fullName.trim())
      nextErrors.fullName = "Full Name is required.";
    if (!formData.email.trim())
      nextErrors.email = "Email is required.";
    if (!formData.consultationType.trim())
      nextErrors.consultationType = "Please choose your consultation type.";
    if (!formData.paymentMethod)
      nextErrors.paymentMethod = "Please select a payment method.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // Simulate success and redirect
      console.log("Top-up submitted:", formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/post-case");
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center text-[#1A3636] mb-2">
          Consultation Payment
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please complete your payment to continue with case submission.
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
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Redirecting to case submission page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Hidden Client ID */}
            <input type="hidden" name="clientId" value={formData.clientId} />

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Consultation Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Consultation Type
              </label>
              <select
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                  errors.consultationType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Consultation Type</option>
                <option value="Business">Business Law</option>
                <option value="Family">Family Law</option>
                <option value="Criminal">Criminal Law</option>
                <option value="Property">Property Law</option>
                <option value="Immigration">Immigration Law</option>
              </select>
              {errors.consultationType && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.consultationType}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount (USD)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                * Fixed consultation fee
              </p>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                  errors.paymentMethod ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Payment Method</option>
                <option value="wave">Wave Pay</option>
                <option value="kbzpay">KBZPay</option>
                <option value="credit-card">Credit Card</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            {/* Document Upload (optional) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Attach Document (optional)
              </label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                You may upload your case file or supporting documents here.
              </p>
            </div>

            {/* Information Note */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4 text-sm text-gray-600">
              💡 <b>Note:</b> The $200 fee covers your consultation with a lawyer
              for <b>one case</b>. You will not need to pay again for follow-up
              consultations related to the same case.
            </div>

            <button
              type="submit"
              className="w-full rounded bg-[#83B582] py-2 text-black font-semibold hover:bg-[#55a754]"
            >
              Proceed to Pay
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
