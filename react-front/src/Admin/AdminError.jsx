function AdminError() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-lg text-gray-700">
                    You do not have the necessary permissions to access this page.
                </p>
            </div>
        </div>
    );
}   

export default AdminError;