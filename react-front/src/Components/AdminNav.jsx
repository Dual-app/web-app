import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <div className="sticky top-0 left-0 h-screen w-full bg-[#83B582] text-white flex flex-col pt-8">
      <div className="flex flex-col items-start gap- mb-8 pl-7">
        <h3 className="text-center mb-10 font-semibold text-xl">
          Admin
        </h3>
      </div>
      <div className="flex flex-col gap-2 px-2">
        <Link
          to="/admin/dashboard"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-speedometer2 mr-2"></i> Dashboard
        </Link>
         <Link
          to="/admin/adminmanagement"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-person-badge"></i> Admin
        </Link>
        <Link
          to="/admin/lawyermanagement"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-people mr-2"></i> Lawyer
        </Link>
        <Link
          to="/admin/lawbookmanagement"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-book mr-2"></i> LawBook
        </Link>
        <Link
          to="/admin/lawyerschedulemanagement"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-file-earmark-text mr-2"></i> Schedule
        </Link>
        <Link
          to="/admin/clientappointment"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-gear mr-2"></i> ClientAppointment        </Link>
        <Link
          to="/home"
          className="hover:bg-[#55a754] rounded flex items-center text-white pl-7 py-3 !no-underline"
        >
          <i className="bi bi-box-arrow-right mr-2"></i> Logout
        </Link>
        
      </div>
    </div>
  );
}

export default AdminNav;
