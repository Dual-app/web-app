function AdminTop() {
  return (
    <div className="topbar flex justify-between items-center">
      <h3>Dashboard</h3>
      <div>Admin Name</div>
      <div className="flex">
        <div className="relative ms-3">
          <button
            className="bg-white px-3 py-2 relative"
            type="button"
            id="notificationBtn"
          >
            <i className="bi bi-bell"></i>
            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5"
              id="notificationCount"
            >
              3
            </span>
          </button>
          {/* <!-- Dropdown (static for now) --> */}
          <ul
            className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded p-2 z-10 hidden"
            id="notificationList"
          >
            {/* <!-- Notifications will appear here --> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminTop;
