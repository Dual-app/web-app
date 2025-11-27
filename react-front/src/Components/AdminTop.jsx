import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../content/AuthContext";

export default function AdminTop({ adminName = "Admin" }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white border-b px-4 py-3 shadow-sm">
      {/* LEFT SIDE LOGO / TITLE */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#83B582]/10 text-[#83B582]">
          <i className="bi bi-speedometer2"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          LegalEase Law Firm
        </h3>
      </div>

      {/* RIGHT SIDE: ADMIN ONLY (NO NOTIFICATIONS) */}
      <div className="flex items-center gap-3">
        {/* ADMIN AVATAR */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#83B582] text-white flex items-center justify-center text-sm">
            {auth?.user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {auth?.user?.name}
            </p>
            <p className="text-xs text-gray-500">{auth?.user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
