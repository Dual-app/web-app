function LawyerManagement() {
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="mb-5 text-[#677D6A] font-semibold text-lg">
          Register New Lawyer
        </h2>
        <form id="lawyerForm">
          <div className="mb-4">
            <label htmlFor="lawyerID" className="block font-medium mb-1">
              Lawyer ID
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              id="lawyerID"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lawyerName" className="block font-medium mb-1">
              Lawyer Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="lawyerName"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="phone"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lawyerType" className="block font-medium mb-1">
              Type of Lawyer
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="lawyerType"
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Criminal">Criminal</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
              <option value="Corporate">Corporate</option>
              <option value="Immigration">Immigration</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#83B582] hover:bg-[#55a754] text-white font-semibold px-6 py-2 rounded shadow"
          >
            Register Lawyer
          </button>
        </form>
      </div>

      <section>
        <h2 class="text-lg font-semibold mb-4">Existing Lawyers</h2>
        <div class="overflow-x-auto">
          <table
            id="lawyerTable"
            class="w-full bg-white rounded-xl shadow overflow-hidden"
          >
            <thead>
              <tr>
                <th class="bg-[#83B582] text-white text-left px-4 py-3">ID</th>
                <th class="bg-[#83B582] text-white text-left px-4 py-3">
                  Name
                </th>
                <th class="bg-[#83B582] text-white text-left px-4 py-3">
                  Address
                </th>
                <th class="bg-[#83B582] text-white text-left px-4 py-3">
                  Phone
                </th>
                <th class="bg-[#83B582] text-white text-left px-4 py-3">
                  Type of Lawyer
                </th>
                <th class="bg-[#83B582] text-white text-left px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{/* <!-- Existing lawyers will appear here --> */}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default LawyerManagement;
