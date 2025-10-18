import { Link } from "react-router-dom";
import React, { useState } from "react";
import LoginModal from "../Customer/loginclient.jsx";
import RegisterModal from "../Customer/registerclient.jsx";

function CustomerNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            LegalEase
          </Link>

          <input
            id="nav-toggle"
            type="checkbox"
            className="peer hidden"
            aria-hidden="true"
          />

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-sm hover:text-gray-300">
              Home
            </Link>
            <Link
              to="/customer/aboutus"
              className="text-sm hover:text-gray-300"
            >
              About Us
            </Link>
            <Link
              to="/customer/lawbook"
              className="text-sm hover:text-gray-300"
            >
              Lawbook
            </Link>
            <Link to="/customer/lawyer" className="text-sm hover:text-gray-300">
              Lawyers
            </Link>

            <div className="flex items-center gap-2">
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

          {/* Mobile hamburger */}
          <label
            htmlFor="nav-toggle"
            className="cursor-pointer md:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <div className="h-0.5 w-6 bg-white"></div>
              <div className="h-0.5 w-6 bg-white"></div>
              <div className="h-0.5 w-6 bg-white"></div>
            </div>
          </label>
        </div>

        {/* Mobile menu */}
        {/* <div className="peer-checked:block hidden border-t border-gray-700 md:hidden">
                  <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
                    {[
                      ["Home", "/"],
                      ["About Us", "/about.html"],
                      ["Practice Areas", "/practice-areas.html"],
                      ["Case Studies", "/case.html"],
                      ["Attorneys", "/attorneys.html"],
                      ["Blog", "/blog.html"],
                      ["Contact", "/contact.html"],
                    ].map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        className="text-sm text-gray-200 hover:text-white"
                      >
                        {label}
                      </a>
                    ))}
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
                </div> */}
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
