import AdminNav from "./../Components/AdminNav";
import AdminTop from "./../Components/AdminTop";

function Dashboard() {
  return (
    <>
      <AdminTop />
      <div className="flex min-h-screen bg-gray-100">
        <AdminNav />
        <h2>Dashboard</h2>
      </div>
    </>
  );
}

export default Dashboard;
