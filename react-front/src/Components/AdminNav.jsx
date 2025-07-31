import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav className="bg-blue-600 w-64 h-screen">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-home"></i>
          Home
        </Link>
        <Link
          to="/usermanagement"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-users"></i>
          User Management
        </Link>
        <Link
          to="/reports"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-chart-line"></i>
          Reports
        </Link>
        <Link
          to="/customers"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-users"></i>
          Customers
        </Link>
        <Link
          to="/products"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-box"></i>
          Products
        </Link>
        <Link
          to="/finance"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-dollar-sign"></i>
          Finance
        </Link>
        <Link
          to="/hr"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          HR
        </Link>

        <Link
          to="/dashboard"
          className="flex gap-4 items-center text-xl text-white hover:text-gray-300 p-6"
        >
          <i className="fas fa-tachometer-alt"></i>
          Settings
        </Link>
      </div>
    </nav>
  );
}

export default AdminNav;
