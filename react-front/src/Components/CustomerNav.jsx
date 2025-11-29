import React, { useState, useEffect } from "react";
import LoginModal from "../Customer/loginclient";
import RegisterModal from "../Customer/registerclient";
import BookNowBanner from "./booknowbanner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../content/AuthContext";

function CustomerNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  // Open login/register modal triggers
  useEffect(() => {
    const openLoginListener = () => setOpenLogin(true);
    const openRegisterListener = () => setOpenRegister(true);

    window.addEventListener("open-login", openLoginListener);
    window.addEventListener("open-register", openRegisterListener);

    return () => {
      window.removeEventListener("open-login", openLoginListener);
      window.removeEventListener("open-register", openRegisterListener);
    };
  }, []);

  return (
    <>
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold">LegalEase</Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link
              to="/customer/aboutus"
              className="hover:text-gray-300 text-sm"
            >
              About Us
            </Link>
            <Link
              to="/customer/lawbook"
              className="hover:text-gray-300 text-sm"
            >
              Lawbook
            </Link>
            <Link to="/customer/lawyer" className="hover:text-gray-300 text-sm">
              Lawyers
            </Link>
            <Link
              to="/customer/clientbookinghistory"
              className="hover:text-gray-300 text-sm"
            >
              History
            </Link>
            <Link
              to="/customer/clientbooking"
              className="hover:text-gray-300 text-sm"
            >
              Booking
            </Link>

            {/* 🔐 Login & Register buttons */}
            {auth ? (
              <>
                <span className="text-sm text-gray-300">
                  Hello, {auth.user.name}
                </span>
                <button
                  onClick={logout}
                  className="rounded bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="rounded border border-white/70 px-3 py-1.5 text-sm hover:bg-white hover:text-gray-900"
                >
                  Login
                </button>

                <button
                  onClick={() => setOpenRegister(true)}
                  className="rounded bg-[#83B582] px-3 py-1.5 text-sm font-medium text-black hover:bg-[#55a754]"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="peer-checked:block hidden border-t border-gray-700 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
            <Link to="/" className="hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link
              to="/customer/aboutus"
              className="hover:text-gray-300 text-sm"
            >
              About Us
            </Link>
            <Link
              to="/customer/lawbook"
              className="hover:text-gray-300 text-sm"
            >
              Lawbook
            </Link>
            <Link to="/customer/lawyer" className="hover:text-gray-300 text-sm">
              Lawyers
            </Link>
            <Link
              to="/customer/clientbookinghistory"
              className="hover:text-gray-300 text-sm"
            >
              History
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenLogin(true)}
                className="w-full rounded border border-white/70 px-3 py-2 text-center text-sm hover:bg-white hover:text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => setOpenRegister(true)}
                className="w-full rounded bg-[#83B582] px-3 py-2 text-sm font-medium text-black hover:bg-[#55a754]"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner + Modals */}
      <BookNowBanner />
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
    </>
  );
}

export default CustomerNav;
