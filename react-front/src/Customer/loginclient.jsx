import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../content/AuthContext";

const EMAIL_RX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginModal({ open, onClose }) {
  const modalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Close on ESC / outside click
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) onClose?.();
    }
    function outsideClick(e) {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [open, onClose]);

  const { login } = useAuth(); // ← import from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};

    // Validate email
    if (!EMAIL_RX.test(email.trim()))
      next.email = "Please enter a valid email.";

    // Validate password
    if (!password.trim()) next.password = "Password is required.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrors({ password: "Invalid email or password." });
        return;
      }

      // SAVE LOGIN SESSION (Context + localStorage)
      login(data);

      setSuccess(true);

      setTimeout(() => {
        onClose?.();

        // ROLE-BASED REDIRECT
        if (data.user.role === "admin" || data.user.role === "superadmin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/customer/home";
        }
      }, 1200);
    } catch (err) {
      setErrors({ password: "Server error. Try again later." });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="w-full max-w-md rounded-lg bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="w-full text-center text-xl font-semibold">
              Login to Your Account
            </h3>
            <button
              onClick={onClose}
              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
              aria-label="Close"
            >
              {/* X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          </div>

          {/* Success message */}
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
                Login Successful!
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6">
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="Enter your email"
                  className={`w-full rounded border px-3 py-2 focus:outline-none focus:border-[#83B582] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:border-[#83B582] ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-700 hover:bg-gray-100"
                  >
                    {showPw ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M3 3l18 18M10.584 10.59A3 3 0 0115 12c0 .79-.31 1.5-.816 2.03M9 9a3 3 0 014.243-2.828M6.42 6.42C4.57 7.6 3.27 9.29 2.458 12 3.732 16.057 7.523 19 12 19c1.44 0 2.81-.27 4.06-.76"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded bg-[#83B582] px-4 py-2 font-medium text-black hover:bg-[#55a754]"
              >
                Login
              </button>

              <div className="mt-3 text-center text-sm">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onClose?.(); // Close login popup
                    window.dispatchEvent(new CustomEvent("open-register")); // Open register popup
                  }}
                  className="text-[#1A3636] underline"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
