import React, { useState, useEffect } from "react";
import LoginModal from "../Customer/loginclient";
import RegisterModal from "../Customer/registerclient";
import BookNowBanner from "./booknowbanner";
import { Link } from "react-router-dom";
import { useAuth } from "../content/AuthContext";

function CustomerNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth, logout } = useAuth();

  // Trigger login/register modals from anywhere
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

          {/* Brand */}
          <Link to="/" className="text-lg font-semibold">
            LegalEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gray-300 text-sm">Home</Link>
            <Link to="/customer/aboutus" className="hover:text-gray-300 text-sm">About Us</Link>
            <Link to="/customer/lawbook" className="hover:text-gray-300 text-sm">Lawbook</Link>
            <Link to="/customer/lawyer" className="hover:text-gray-300 text-sm">Lawyers</Link>
            <Link to="/customer/clientbookinghistory" className="hover:text-gray-300 text-sm">History</Link>
            <Link to="/customer/clientbooking" className="hover:text-gray-300 text-sm">Booking</Link>

            {/* Authentication */}
            {auth ? (
              <>
                <span className="text-sm text-gray-300">
                  Hello, {auth.user.name}
                </span>

                <button
                  onClick={logout}
                  className="rounded bg-red-500 px-3 py-1.5 text-sm font-medium hover:bg-red-600"
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

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center text-gray-200 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
              <Link to="/" className="hover:text-gray-300 text-sm" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/customer/aboutus" className="hover:text-gray-300 text-sm" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link to="/customer/lawbook" className="hover:text-gray-300 text-sm" onClick={() => setMobileMenuOpen(false)}>Lawbook</Link>
              <Link to="/customer/lawyer" className="hover:text-gray-300 text-sm" onClick={() => setMobileMenuOpen(false)}>Lawyers</Link>
              <Link to="/customer/clientbookinghistory" className="hover:text-gray-300 text-sm" onClick={() => setMobileMenuOpen(false)}>History</Link>
              <Link to="/customer/clientbooking" className="hover:text-gray-300 text-sm" onClick={() => setMobileMenuOpen(false)}>Booking</Link>

              {!auth ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setOpenLogin(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded border border-white/70 px-3 py-2 text-center text-sm hover:bg-white hover:text-gray-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setOpenRegister(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded bg-[#83B582] px-3 py-2 text-sm font-medium text-black hover:bg-[#55a754]"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded bg-red-500 px-3 py-2 text-sm text-white font-semibold hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Banner + Modals */}
      <BookNowBanner />
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
    </>
  );
}

export default CustomerNav;
