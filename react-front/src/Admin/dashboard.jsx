function Dashboard() {
  const stats = {
    totalBookings: 12,
    totalCases: 7,
    totalPayments: 5,
    completedAppointments: 3,
  };

  const recentBookings = [
    {
      id: "BKG-001",
      client: "Mya Nandar",
      lawyer: "John Doe",
      status: "Scheduled",
      date: "2025-11-02",
      time: "10:00 AM",
    },
    {
      id: "BKG-002",
      client: "David Lin",
      lawyer: "Jane Smith",
      status: "Paid",
      date: "2025-11-04",
      time: "2:30 PM",
    },
    {
      id: "BKG-003",
      client: "Aung Kyaw",
      lawyer: "U Soe Win",
      status: "Completed",
      date: "2025-10-25",
      time: "11:00 AM",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-2xl font-semibold text-[#1A3636] mb-6">
        Admin Dashboard Overview
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <h2 className="text-3xl font-bold text-[#83B582] mt-1">
            {stats.totalBookings}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Cases</p>
          <h2 className="text-3xl font-bold text-[#83B582] mt-1">
            {stats.totalCases}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Payments</p>
          <h2 className="text-3xl font-bold text-[#83B582] mt-1">
            {stats.totalPayments}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Completed Appointments</p>
          <h2 className="text-3xl font-bold text-[#83B582] mt-1">
            {stats.completedAppointments}
          </h2>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1A3636]">
            Recent Bookings
          </h2>
          <button className="text-sm text-[#83B582] hover:text-[#55a754] font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-[#83B582] text-white text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Booking ID</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Lawyer</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Appointment</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b, i) => (
                <tr
                  key={b.id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-[#f0f8f4] transition`}
                >
                  <td className="px-4 py-3 font-medium">{b.id}</td>
                  <td className="px-4 py-3">{b.client}</td>
                  <td className="px-4 py-3">{b.lawyer}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : b.status === "Paid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-sm text-gray-800">{b.date}</span>
                    <span className="block text-xs text-gray-500">{b.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
