import { Outlet } from "react-router-dom";
import CustomerNav from "./Components/CustomerNav";

export default function CustomerLayout() {
  return (
    <div>
        <CustomerNav />
      <div className="p-6">
        <Outlet /> {/* This renders Home, AboutUs, etc */}
      </div>
    </div>
  );
}
