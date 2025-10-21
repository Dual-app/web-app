import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topup() {
  const navigate = useNavigate();

  // Example: Get client ID from login/session
  const clientId = localStorage.getItem("clientId") || "CL-0001";

  const [formData, setFormData] = useState({
    clientId: clientId,
    fullName: "",
    email: "",
    consultationType: "",
    amount: 100,
    paymentMethod: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //  Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!formData.fullName.trim())
      nextErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!formData.consultationType.trim())
      nextErrors.consultationType = "Please choose your consultation type.";
    if (!formData.paymentMethod)
      nextErrors.paymentMethod = "Please select a payment method.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      //  Backend connection example (adjust endpoint as needed)
      // const res = await fetch("http://localhost:5000/topup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!res.ok) throw new Error("Payment submission failed");

      console.log("Payment Data:", formData);

      // Simulate success message
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => navigate("/post-case"), 2500);
      }, 1500);
    } catch (err) {
      setLoading(false);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-[#1A3636] mb-2">
          Consultation Payment
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please complete your payment to continue your case submission.
        </p>

        {/*  Success Message */}
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
              Redirecting to your case submission page...
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


            {/* Amount (Fixed) */}
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

            {/* Optional Document Upload */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Attach Document (optional)
              </label>
              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                You may upload related case documents.
              </p>
            </div>

            {/* Information Note */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4 text-sm text-gray-600">
              💡 <b>Note:</b> The $200 fee covers your consultation with a lawyer
              for <b>one case</b>. You do not need to pay again for additional
              consultations related to this case.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded py-2 text-black font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#83B582] hover:bg-[#55a754]"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
