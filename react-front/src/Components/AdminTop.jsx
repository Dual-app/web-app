import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LS_KEY = "admin_notifications_v1";

// Load notifications
function loadNotifications() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveNotifications(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}

// Outline icons (Option 2)
function iconCircle(type) {
  switch (type) {
    case "schedule":
      return "border-blue-500 text-blue-500";
    case "client":
      return "border-green-600 text-green-600";
    default:
      return "border-gray-500 text-gray-500";
  }
}

export default function AdminTop({ adminName = "Admin" }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => loadNotifications());
  const navigate = useNavigate();
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Listen for new notifications from app
  useEffect(() => {
    function onNew(e) {
      const d = e.detail;
      const entry = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        type: d.type || "info",
        title: d.title || "New notification",
        message: d.message || "",
        href: d.href || null,
        createdAt: Date.now(),
        read: false,
      };

      const updated = [entry, ...notifications];
      setNotifications(updated);
      saveNotifications(updated);
    }
    window.addEventListener("app:new-notification", onNew);
    return () => window.removeEventListener("app:new-notification", onNew);
  }, [notifications]);

  const unread = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  function markAllRead() {
    const next = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(next);
    saveNotifications(next);
  }

  function clearAll() {
    setNotifications([]);
    saveNotifications([]);
  }

  function openItem(n) {
    const next = notifications.map((x) =>
      x.id === n.id ? { ...x, read: true } : x
    );
    setNotifications(next);
    saveNotifications(next);

    setOpen(false);
    if (n.href) navigate(n.href);
  }

  return (
    <div
      className="flex justify-between items-center bg-white border-b px-4 py-3 shadow-sm"
      ref={ref}
    >
      {/* LEFT SIDE LOGO / TITLE */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#83B582]/10 text-[#83B582]">
          <i className="bi bi-speedometer2"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          LegalEase Law Firm
        </h3>
      </div>


      {/* Right: Admin + Notifications */}
      <div className="flex items-center gap-3">
        {/* BELL ICON */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"
          >
            <i className="bi bi-bell text-gray-700 text-lg"></i>

            {unread > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping opacity-75"></span>
              </>
            )}
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl z-50">
              {/* HEADER */}
              <div className="px-4 py-2.5 border-b flex items-center justify-between bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Notifications
                  </p>
                  <p className="text-xs text-gray-500">
                    {unread > 0 ? `${unread} unread` : "All caught up"}
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-[10px] px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-red-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* LIST */}
              <ul className="max-h-[60vh] overflow-auto">
                {notifications.length === 0 ? (
                  <li className="text-center text-sm text-gray-500 py-6">
                    No notifications
                  </li>
                ) : (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      onClick={() => openItem(n)}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${
                        !n.read ? "bg-[#83B582]/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* OUTLINE CIRCLE ICON (Option 2) */}
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${iconCircle(
                            n.type
                          )}`}
                        >
                          {n.type === "schedule" && (
                            <i className="bi bi-calendar2-check"></i>
                          )}
                          {n.type === "client" && (
                            <i className="bi bi-person-lines-fill"></i>
                          )}
                          {n.type !== "schedule" &&
                            n.type !== "client" && <i className="bi bi-bell"></i>}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-800">
                              {n.title}
                            </p>
                            <span className="text-[11px] text-gray-400">
                              {timeAgo(n.createdAt)}
                            </span>
                          </div>

                          {n.message && (
                            <p className="text-xs text-gray-600 mt-0.5">
                              {n.message}
                            </p>
                          )}

                          {n.href && (
                            <p className="text-xs text-[#1A3636] mt-1 flex items-center">
                              <i className="bi bi-box-arrow-up-right mr-1"></i>
                              Click to open
                            </p>
                          )}
                        </div>

                        {!n.read && (
                          <span className="mt-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* ADMIN AVATAR */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#83B582] text-white flex items-center justify-center text-sm">
            {adminName[0]?.toUpperCase() || "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
