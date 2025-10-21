import React from "react";
import { Link } from "react-router-dom";

export default function BookNowBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#83B582] p-4 text-center shadow-lg z-50">
      <Link
        to="/booking"
        className="inline-block bg-black text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Book Now
      </Link>
    </div>
  );
}
