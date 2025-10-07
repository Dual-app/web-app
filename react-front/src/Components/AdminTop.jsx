import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const LS_KEY = "admin_notifications_v1";

function loadNotifications() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveNotifications(list) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {}
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

function iconFor(type) {
  switch (type) {
    case "schedule":
      return "bi-calendar2-check";
    case "client":
      return "bi-person-lines-fill";
    default:
      return "bi-bell";
  }
}

export default function AdminTop({ adminName = "Admin" }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => loadNotifications());
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Listen for new notifications from anywhere in the app
  useEffect(() => {
    function onNew(e) {
      const detail = e.detail || {};
      const entry = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
        type: detail.type || "info",
        title: detail.title || "New notification",
        message: detail.message || "",
        href: detail.href || null,
        data: detail.data || null,
        createdAt: Date.now(),
        read: false,
      };
      setNotifications((prev) => {
        const next = [entry, ...prev];
        saveNotifications(next);
        return next;
      });
    }
    window.addEventListener("app:new-notification", onNew);
    return () => window.removeEventListener("app:new-notification", onNew);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const hasUnread = unreadCount > 0;

  function toggleOpen() {
    setOpen((v) => !v);
  }

  function markAllRead() {
    const next = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(next);
    saveNotifications(next);
  }

  function clearAll() {
    setNotifications([]);
    saveNotifications([]);
  }

  function onClickItem(n) {
    // Mark read
    const next = notifications.map((x) => (x.id === n.id ? { ...x, read: true } : x));
    setNotifications(next);
    saveNotifications(next);
    setOpen(false);

    // Navigate if href provided
    if (n.href) {
      if (n.href.startsWith("http")) {
        window.location.href = n.href;
      } else {
        navigate(n.href);
      }
    }
  }

  return (
    <div
      className="topbar flex justify-between items-center bg-white border-b px-4 py-3 shadow-sm"
      ref={containerRef}
    >
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#83B582]/10 text-[#83B582]">
          <i className="bi bi-speedometer2"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
      </div>

      {/* Middle: Search (optional for beauty) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-6">
        <div className="relative w-full">
          <i className="bi bi-search absolute left-3 top-2.5 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search…"
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Right: Admin + Notifications */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleOpen}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border hover:bg-gray-50 transition"
            aria-label="Notifications"
          >
            <i className="bi bi-bell text-gray-700 text-lg"></i>

            {/* Red dot with pulse when there is unread */}
            {hasUnread && (
              <>
                <span className="absolute top-1.5 right-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
                <span className="absolute top-1.5 right-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 opacity-75 animate-ping"></span>
              </>
            )}
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl z-50 ${
              open ? "block" : "hidden"
            }`}
          >
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">Notifications</p>
                <p className="text-xs text-gray-500">
                  {hasUnread ? `${unreadCount} unread` : "All caught up"}
                </p>
              </div>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <ul className="max-h-[60vh] overflow-auto py-1">
              {notifications.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-gray-500">
                  No notifications
                </li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition ${
                      !n.read ? "bg-[#83B582]/5" : ""
                    }`}
                    onClick={() => onClickItem(n)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 text-[#83B582] w-8 h-8 rounded-full flex items-center justify-center ${
                          n.type === "client"
                            ? "bg-[#83B582]/10"
                            : n.type === "schedule"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <i className={`bi ${iconFor(n.type)}`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-800">{n.title}</p>
                          <span className="text-[11px] text-gray-400 ml-2">
                            {timeAgo(n.createdAt)}
                          </span>
                        </div>
                        {n.message && (
                          <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                        )}
                        {n.href && (
                          <span className="inline-flex items-center text-xs text-[#1A3636] mt-1">
                            <i className="bi bi-box-arrow-up-right mr-1"></i> Click to view
                          </span>
                        )}
                      </div>
                      {!n.read && <span className="mt-1 h-2 w-2 rounded-full bg-red-500"></span>}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Admin avatar/name */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#83B582] text-white flex items-center justify-center text-sm">
            {adminName?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
