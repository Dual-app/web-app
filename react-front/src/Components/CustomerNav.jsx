import React, { useState, useEffect, useRef } from "react";
import LoginModal from "../Customer/loginclient";
import RegisterModal from "../Customer/registerclient";
import BookNowBanner from "./booknowbanner";
import { Link, useNavigate } from "react-router-dom";

function CustomerNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // Notifications
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ---- Helpers for localStorage mock ----
  const STORAGE_KEY = "le_notifications";

  const loadNotifications = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setNotifications(Array.isArray(parsed) ? parsed : []);
      } catch {
        setNotifications([]);
      }
    } else {
      // Seed demo notifications (for now)
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
  };

  const saveNotifications = (list) => {
    setNotifications(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    const next = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(next);
  };

  const markOneRead = (id) => {
    const next = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(next);
  };

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

  // Event listeners for login/register popups
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

  // Load notifications
  useEffect(() => {
    loadNotifications();
  }, []);

  // SVG Icon components
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
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            LegalEase
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link to="/customer/aboutus" className="hover:text-gray-300 text-sm">
              About Us
            </Link>
            <Link to="/customer/lawbook" className="hover:text-gray-300 text-sm">
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

            {/* 🔔 Notification Bell */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setBellOpen((v) => !v)}
                className="relative rounded p-2 hover:bg-white/10 focus:outline-none"
                aria-label="Notifications"
              >
                <BellIcon />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#83B582] text-black text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-[5px]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown menu */}
              {bellOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-lg border border-gray-700 bg-gray-800 text-white shadow-xl">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
                    <span className="text-sm font-semibold">Notifications</span>
                    <button
                      onClick={markAllRead}
                      className="text-xs text-[#83B582] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <ul className="max-h-80 overflow-auto">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-4 text-sm text-gray-300">
                        No notifications yet.
                      </li>
                    ) : (
                      notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`px-4 py-3 text-sm border-b border-gray-700 ${
                            n.read ? "bg-transparent" : "bg-gray-900/40"
                          }`}
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
                              <p className="leading-snug">{n.message}</p>
                              {n.bookingId && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Booking ID: <b>{n.bookingId}</b>
                                </p>
                              )}
                              <div className="mt-2 flex items-center gap-2">
                                {n.type === "payment_pending" ? (
                                  <button
                                    onClick={() => {
                                      markOneRead(n.id);
                                      navigate(
                                        `/customer/topuppg?bookingId=${n.bookingId}`
                                      );
                                      setBellOpen(false);
                                    }}
                                    className="text-black bg-[#83B582] hover:bg-[#55a754] px-2 py-1 rounded text-xs font-medium"
                                  >
                                    Pay now
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      markOneRead(n.id);
                                      navigate(
                                        "/customer/clientbookinghistory"
                                      );
                                      setBellOpen(false);
                                    }}
                                    className="text-xs text-[#83B582] underline hover:text-[#55a754]"
                                  >
                                    View details
                                  </button>
                                )}
                                {!n.read && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">
                                    new
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>

                  <div className="px-3 py-2 text-right">
                    <button
                      onClick={() => {
                        setBellOpen(false);
                        navigate("/customer/clientbookinghistory");
                      }}
                      className="text-xs text-[#83B582] hover:underline"
                    >
                      View all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 🔐 Login & Register buttons */}
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

        {/* MOBILE MENU */}
        <div className="peer-checked:block hidden border-t border-gray-700 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
            <Link to="/" className="hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link to="/customer/aboutus" className="hover:text-gray-300 text-sm">
              About Us
            </Link>
            <Link to="/customer/lawbook" className="hover:text-gray-300 text-sm">
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

      <BookNowBanner />

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
