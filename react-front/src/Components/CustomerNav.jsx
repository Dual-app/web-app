import React, { useState, useEffect } from "react";
import LoginModal from "../Customer/loginclient.jsx";
import RegisterModal from "../Customer/registerclient.jsx";
import { Link } from "react-router-dom";

function CustomerNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

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
      {/* Your existing nav UI */}
      <nav className="sticky top-0 z-40 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            LegalEase
          </Link>

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
          </div>
        </div>

        {/* Mobile menu */}
        <div className="peer-checked:block hidden border-t border-gray-700 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
            <Link to="/" className="hover:text-gray-300 text-sm">Home</Link>
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
            <Link
              to="/customer/lawyer"
              className="hover:text-gray-300 text-sm"
            > 
              Lawyers
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

      {/* MODALS */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </>
  );
}

export default CustomerNav;
