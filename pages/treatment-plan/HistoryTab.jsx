import { useState, useEffect } from "react";


function HistoryTab({ selectedPatient }) {
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [visits, setVisits] = useState([]);

  // Update component state when selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      setAllergies(selectedPatient.allergies || []);
      setConditions(selectedPatient.conditions || []);
      setVisits(selectedPatient.visits || []);
    } else {
      // Reset state when no patient is selected
      setAllergies([]);
      setConditions([]);
      setVisits([]);
    }
  }, [selectedPatient]);

  // If no patient is selected, show a message
  if (!selectedPatient) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          Please select a patient to view their history
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visit History */}
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Visit History</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="relative">
            {visits.length > 0 && (
              <div className="absolute h-full w-0.5 bg-gray-200 left-2.5 top-0"></div>
            )}
            <div className="space-y-4">
              {visits.map((visit) => (
                <div className="flex" key={visit.id}>
                  <div className="relative z-10">
                    <div
                      className={`w-5 h-5 rounded-full ${
                        visit.isRecent ? "bg-blue-600" : "bg-gray-300"
                      } flex items-center justify-center`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div
                    className={`flex-1 ml-4 bg-white p-3 rounded border ${
                      visit.isRecent ? "shadow-sm" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-medium">
                          {new Date(visit.date).toLocaleDateString()}
                        </span>
                        <h4 className="font-medium">{visit.type}</h4>
                      </div>
                      {visit.isRecent && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Recent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {visit.summary}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-blue-600 hover:underline cursor-pointer">
                      View full encounter notes
                    </div>
                  </div>
                </div>
              ))}

              {visits.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No visit history available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Allergies Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Allergies</h3>
          <div className="relative">
            <select
              className="pl-2 pr-8 py-1 border rounded text-sm"
              value={selectedAllergy}
              onChange={(e) => setSelectedAllergy(e.target.value)}
            >
              <option value="">Add Allergy...</option>
              <option value="penicillin">Penicillin</option>
              <option value="nsaids">NSAIDs</option>
              <option value="sulfa">Sulfa Drugs</option>
              <option value="pollen">Pollen</option>
              <option value="food">Food Allergy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allergy
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reaction
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allergies.map((allergy) => (
                <tr key={allergy.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {allergy.type}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        allergy.severity === "Severe"
                          ? "bg-red-100 text-red-800"
                          : allergy.severity === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {allergy.severity}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {allergy.reaction}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {allergies.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    No allergies recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chronic Conditions */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Chronic Conditions</h3>
          <div className="relative">
            <select
              className="pl-2 pr-8 py-1 border rounded text-sm"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="">Add Condition...</option>
              <option value="hypertension">Hypertension</option>
              <option value="diabetes">Diabetes</option>
              <option value="asthma">Asthma</option>
              <option value="hiv">HIV</option>
              <option value="arthritis">Arthritis</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosed
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conditions.map((condition) => (
                <tr key={condition.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {condition.condition}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(condition.diagnosed).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        condition.status === "Active"
                          ? "bg-yellow-100 text-yellow-800"
                          : condition.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {condition.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {conditions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    No chronic conditions recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryTab;