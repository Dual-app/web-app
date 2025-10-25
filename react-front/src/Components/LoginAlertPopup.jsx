import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAlertPopup({ onClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center animate-fade-in">
        <h2 className="text-lg font-semibold text-[#1A3636] mb-2">
          Please Log In First
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          You need to log in or register before booking a consultation.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleLogin}
            className="bg-[#83B582] text-black px-4 py-2 rounded hover:bg-[#55a754] transition"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
