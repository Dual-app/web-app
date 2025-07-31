function AdminTop() {
  return (
    <>
      <div className="flex py-6 justify-between items-center">
        <div className="px-10">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="flex justify-evenly items-center w-24/100">
          <input
            className="text-md px-5 py-2 border rounded border-gray-300 focus:outline-none focus:border-black"
            type="text"
            placeholder="Search"
          />
          <i class="fa-regular fa-bell text-2xl"></i>
          <p className="text-xl">Admin</p>
        </div>
      </div>
    </>
  );
}

export default AdminTop;
