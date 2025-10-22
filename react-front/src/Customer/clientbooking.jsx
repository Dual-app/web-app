import React, { useState, useEffect } from 'react';
import { useLawyer } from '../hooks/LawyerHook';  

const Clientbooking = () => {
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const { lawyers, fetchLawyers } = useLawyer();

  useEffect(() => {
    fetchLawyers();
  }, []);

  useEffect(() => {
    if (selectedCaseType) {
      setFilteredLawyers(lawyers.filter(lawyer => lawyer.Lawyer_Type === selectedCaseType));
    }
  }, [selectedCaseType, lawyers]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-center mb-4">Select Lawyer</h1>

        <div className="mb-6">
          <label htmlFor="caseType" className="text-lg text-gray-700">Choose Case Type</label>
          <select
            id="caseType"
            className="mt-2 w-full border rounded-lg px-4 py-2"
            value={selectedCaseType}
            onChange={(e) => setSelectedCaseType(e.target.value)}
          >
            <option value="">Select Case Type</option>
            <option value="Criminal">Criminal</option>
            <option value="Family">Family</option>
            <option value="Corporate">Corporate</option>
            <option value="Property">Property</option>
            <option value="Immigration">Immigration</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.length === 0 ? (
            <p>No lawyers found for the selected case type.</p>
          ) : (
            filteredLawyers.map(lawyer => (
              <div key={lawyer.Lawyer_ID} className="bg-white p-4 rounded-lg shadow-md">
                <img src={lawyer.Lawyer_Photo || 'default-photo.jpg'} alt={lawyer.Lawyer_Name} className="rounded-full w-20 h-20 mb-4" />
                <h3 className="text-lg font-semibold">{lawyer.Lawyer_Name}</h3>
                <p className="text-sm text-gray-600">{lawyer.Lawyer_Type}</p>
                <button className="bg-[#83B582] text-white py-2 px-4 rounded mt-4">Book Now</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientbooking;
