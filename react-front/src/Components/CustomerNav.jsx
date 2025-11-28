import React, { useState, useEffect, useRef } from "react";
import LoginModal from "../Customer/loginclient";
import RegisterModal from "../Customer/registerclient";
import BookNowBanner from "./booknowbanner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../content/AuthContext";

function CustomerNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // Notifications
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const STORAGE_KEY = "le_notifications";

  // Load notifications on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setNotifications(Array.isArray(parsed) ? parsed : []);
      } catch {
        setNotifications([]);
      }
    } else {
      const seed = [
        {
          id: "N001",
          type: "payment_pending",
          message: "Payment pending for booking BKG-002.",
          bookingId: "BKG-002",
          createdAt: new Date().toISOString(),
          read: false,
        },
        {
          id: "N002",
          type: "booking_confirmed",
          message:
            "Admin confirmed your booking BKG-003. Lawyer: Jane Smith (11:00 AM, Nov 12).",
          bookingId: "BKG-003",
          createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
          read: false,
        },
        {
          id: "N003",
          type: "new_booking",
          message: "New booking BKG-004 created successfully.",
          bookingId: "BKG-004",
          createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
          read: true,
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      setNotifications(seed);
    }
  }, []);

  const saveNotifications = (list) => {
    setNotifications(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => saveNotifications(notifications.map((n) => ({ ...n, read: true })));
  const markOneRead = (id) => saveNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    if (bellOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [bellOpen]);

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

  const BellIcon = ({ className = "w-5 h-5" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 005 15h14a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6z" />
      <path d="M9 18a3 3 0 006 0H9z" />
    </svg>
  );

  const Dot = ({ colorClass }) => (
    <span className={`inline-block w-2 h-2 rounded-full ${colorClass}`} />
  );

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

            {/* 🔔 NOTIFICATION BELL */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setBellOpen((v) => !v)}
                className="relative rounded p-2 hover:bg-white/10 focus:outline-none"
              >
                <BellIcon />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#83B582] text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATION DROPDOWN */}
              {bellOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-lg border border-gray-700 bg-gray-900 text-white shadow-xl overflow-hidden">

                  {/* HEADER */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700 bg-gray-800">
                    <span className="text-sm font-semibold">Notifications</span>

                    <div className="flex gap-2">
                      <button
                      onClick={markAllRead}
                      className="text-[10px] px-1.5 py-[2px] rounded-sm bg-gray-700 hover:bg-gray-600 text-[#83B582] whitespace-nowrap"
                      >
                      Read
                    </button>

                    <button
                    onClick={() => saveNotifications([])}
                    className="text-[10px] px-1.5 py-[2px] rounded-sm bg-gray-700 hover:bg-gray-600 text-red-400 whitespace-nowrap ml-1"
                    >
                     Clear
                    </button>
                    </div>
                  </div>

                  {/* LIST */}
                  <ul className="max-h-80 overflow-auto">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-4 text-sm text-gray-300 text-center">
                        No notifications.
                      </li>
                    ) : (
                      notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`px-4 py-3 text-sm border-b border-gray-800 ${
                            n.read ? "bg-gray-900" : "bg-gray-800"
                          } hover:bg-gray-700 transition`}
                        >
                          <div className="flex items-start gap-2">
                            <Dot
                              colorClass={
                                n.type === "payment_pending"
                                  ? "bg-yellow-400"
                                  : n.type === "booking_confirmed"
                                  ? "bg-green-400"
                                  : "bg-blue-400"
                              }
                            />

                            <div className="flex-1">
                              <p className="leading-snug text-gray-200">{n.message}</p>

                              {n.bookingId && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Booking: <b>{n.bookingId}</b>
                                </p>
                              )}

                              <div className="mt-2 flex items-center gap-2">
                                {n.type === "payment_pending" ? (
                                  <button
                                    onClick={() => {
                                      markOneRead(n.id);
                                      navigate(`/customer/topuppg?bookingId=${n.bookingId}`);
                                      setBellOpen(false);
                                    }}
                                    className="text-[11px] px-2 py-1 bg-[#83B582] text-black rounded hover:bg-[#55a754]"
                                  >
                                    Pay
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      markOneRead(n.id);
                                      navigate("/customer/clientbookinghistory");
                                      setBellOpen(false);
                                    }}
                                    className="text-[11px] underline text-[#83B582] hover:text-[#55a754]"
                                  >
                                    Details
                                  </button>
                                )}

                                {!n.read && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#83B582]/20 text-[#83B582] font-semibold">
                                    NEW
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>

                  {/* FOOTER */}
                  <div className="px-3 py-2 text-right bg-gray-800 border-t border-gray-700">
                    <button
                      onClick={() => {
                        setBellOpen(false);
                        navigate("/customer/clientbookinghistory");
                      }}
                      className="text-[11px] text-[#83B582] hover:underline"
                    >
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 🔐 Login & Register buttons */}
            {auth ? (
              <>
                {/* Show User Name */}
                <span className="text-sm text-gray-300">
                  Hello, {auth.user.name}
                </span>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="rounded bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <button
                  onClick={() => setOpenLogin(true)}
                  className="rounded border border-white/70 px-3 py-1.5 text-sm hover:bg-white hover:text-gray-900"
                >
                  Login
                </button>

                {/* Register */}
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
