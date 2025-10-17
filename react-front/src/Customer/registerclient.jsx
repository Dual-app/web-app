import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_RX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const STRONG_PW_RX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function PhoneInput({ value, onChange, ...rest }) {
  function format(v) {
    let s = v.replace(/\D/g, "");
    if (s.length <= 3) return s;
    if (s.length <= 6) return `${s.slice(0, 3)}-${s.slice(3)}`;
    return `${s.slice(0, 3)}-${s.slice(3, 6)}-${s.slice(6, 10)}`;
  }
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(format(e.target.value))}
      inputMode="numeric"
      maxLength={12}
      className={`w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${rest.className || ""}`}
    />
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errs, setErrs] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};

    if (fullName.trim().length < 4)
      next.fullName = "Full Name must be at least 4 characters long.";

    if (!EMAIL_RX.test(email.trim()))
      next.email = "Please enter a valid email address.";

    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone.trim()))
      next.phone = "Please enter a valid phone (XXX-XXX-XXXX).";

    if (!STRONG_PW_RX.test(password))
      next.password =
        "Password must be ≥8 chars with 1 uppercase, 1 lowercase, 1 number, 1 special.";

    if (!confirm.trim()) next.confirm = "Confirm Password is required.";
    else if (confirm !== password) next.confirm = "Passwords do not match.";

    if (!agree) next.agree = "You must accept the Terms and Conditions.";

    setErrs(next);

    if (Object.keys(next).length === 0) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/"); // redirect to Home
      }, 2500);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="w-full text-center text-xl font-semibold">Register</h3>
          <button
            onClick={() => navigate(-1)}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="px-6 py-10 text-center">
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
              Registration Successful!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Redirecting to home page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-4 py-4">
            {/* Full Name */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className={`w-full rounded border px-3 py-2 focus:outline-none focus:border-black ${
                  errs.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errs.fullName && (
                <p className="mt-1 text-sm text-red-600">{errs.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-600">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full rounded border px-3 py-2 focus:outline-none focus:border-black ${
                  errs.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errs.email && (
                <p className="mt-1 text-sm text-red-600">{errs.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-600">Phone</label>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                placeholder="123-456-7890"
              />
              {errs.phone && (
                <p className="mt-1 text-sm text-red-600">{errs.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:border-black ${
                    errs.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-700 hover:bg-gray-100"
                >
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
              {errs.password && (
                <p className="mt-1 text-sm text-red-600">{errs.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-600">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm Password"
                  className={`w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:border-black ${
                    errs.confirm ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-700 hover:bg-gray-100"
                >
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {errs.confirm && (
                <p className="mt-1 text-sm text-red-600">{errs.confirm}</p>
              )}
            </div>

            {/* Terms */}
            <div className="mb-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((v) => !v)}
                  className="h-4 w-4 rounded border-gray-300 text-[#83B582] focus:ring-[#83B582]"
                />
                <span>
                  I accept the{" "}
                  <a href="#" className="text-[#1A3636] underline">
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {errs.agree && (
                <p className="mt-1 text-sm text-red-600">{errs.agree}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded bg-[#83B582] px-4 py-2 font-medium text-black hover:bg-[#55a754]"
            >
              Submit
            </button>

            <div className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-[#1A3636] underline">
                Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
