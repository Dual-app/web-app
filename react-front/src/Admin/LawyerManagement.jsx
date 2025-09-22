import { usePostGet } from "../function/postget";

function LawyerManagement() {
  const data = usePostGet();

  const lawyerID = data ? data.length + 1 : 1;

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
              value={lawyerID}
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
            {data && (
              <tbody>
                {data.map((lawyer) => (
                  <tr key={lawyer.id}>
                    <td class="border-t px-4 py-3">{lawyer.ID}</td>
                    <td class="border-t px-4 py-3">{lawyer.Name}</td>
                    <td class="border-t px-4 py-3">{lawyer.Address}</td>
                    <td class="border-t px-4 py-3">{lawyer.Phone}</td>
                    <td class="border-t px-4 py-3">{lawyer.Type}</td>
                    <td class="border-t px-4 py-3">
                      <button class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </section>
    </>
  );
}

export default LawyerManagement;
