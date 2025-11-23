import { Outlet } from "react-router-dom";
import AdminNav from "./Components/AdminNav";
import AdminTop from "./Components/AdminTop";

export default function App() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:block w-1/6">
        <AdminNav />
      </div>
      <div className="flex flex-col w-full p-7">
        <AdminTop />
        <div className="flex-1 p-8">
          <Outlet /> {/*  Admin routes renderer */}
        </div>
      </div>
    </div>
  );
}
