// import React, { useState } from "react";
import React, { useState, useEffect } from 'react';

const icd10Codes = [
  { code: "A00", name: "Cholera" },
  { code: "B50", name: "Malaria" },
  { code: "I10", name: "Essential (primary) hypertension" },
  { code: "E11", name: "Type 2 diabetes mellitus" },
  // ... add more as needed
];

function DiagnosisTab({ selectedPatient }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [diagnoses, setDiagnoses] = useState(selectedPatient?.diagnoses || []);
  const [selectedCode, setSelectedCode] = useState(null);

  const filteredCodes = icd10Codes.filter((code) =>
    code.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    if (selectedPatient?.diagnoses) {
      setDiagnoses(selectedPatient.diagnoses);
    }
  }, [selectedPatient]);

  const handleAddDiagnosis = () => {
    if (!selectedCode) return;

    const newDiagnosis = {
      condition: `${selectedCode.name} (${selectedCode.code})`,
      date: new Date().toISOString().split("T")[0], // today's date
      severity: "Unknown",
    };

    setDiagnoses([...diagnoses, newDiagnosis]);
    setSelectedCode(null);
    setSearchTerm("");
  };

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-2">Diagnosis Information</h3>

      {/* Search Bar and Dropdown */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ICD-10 condition (e.g. malaria)"
          className="border p-2 w-full rounded mb-2"
        />
        {searchTerm && (
          <ul className="border rounded max-h-40 overflow-y-auto bg-white shadow">
            {filteredCodes.map((code, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelectedCode(code);
                  setSearchTerm(code.name);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {code.name} ({code.code})
              </li>
            ))}
            {filteredCodes.length === 0 && (
              <li className="p-2 text-gray-500">No matches found.</li>
            )}
          </ul>
        )}
        <button
          onClick={handleAddDiagnosis}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!selectedCode}
        >
          Add Diagnosis
        </button>
      </div>

      {/* Diagnosis List */}
      {diagnoses.length > 0 ? (
        <ul className="space-y-2">
          {diagnoses.map((diag, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded">
              <p>
                <strong>Condition:</strong> {diag.condition}
              </p>
              <p>
                <strong>Date Diagnosed:</strong> {diag.date}
              </p>
              <p>
                <strong>Severity:</strong> {diag.severity}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            No diagnosis information available.
          </p>
        </div>
      )}
    </div>
  );
}

export default DiagnosisTab;
