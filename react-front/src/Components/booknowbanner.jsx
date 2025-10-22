import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function BookNowBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-blue-600 py-3 shadow-lg">
      <BannerContent setIsVisible={setIsVisible} />
    </div>
  );
}
 
function BannerContent({ setIsVisible }) {
  return (
    <div className="w-full pl-5 pr-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-white text-sm">
        Plan your legal consultation today!{" "}
        <Link to="/customer/clientbooking" className="text-white font-bold underline">Book Now</Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-md text-white font-bold"
      >
        x
      </button>
    </div>
  );
}

export default BookNowBanner;
