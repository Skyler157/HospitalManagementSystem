import React, { useState, useEffect } from 'react';

const EncounterTab = ({ selectedPatient, templateApplied }) => {
  const patientId = selectedPatient?.id;
  const localStorageKey = `soap_${patientId}`;

  const [soap, setSoap] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });

  // Load from localStorage or template when component mounts or template changes
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      setSoap(JSON.parse(stored));
    } else if (templateApplied) {
      const newSoap = {
        subjective: templateApplied.soap.subjective,
        objective: templateApplied.soap.objective,
        assessment: templateApplied.soap.assessment,
        plan: templateApplied.soap.plan,
      };
      setSoap(newSoap);
      localStorage.setItem(localStorageKey, JSON.stringify(newSoap));
    }
  }, [templateApplied, patientId]);

  // Save to localStorage whenever soap state changes
  useEffect(() => {
    if (patientId) {
      localStorage.setItem(localStorageKey, JSON.stringify(soap));
    }
  }, [soap, patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoap(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">SOAP Notes</h2>
      <div className="grid grid-cols-1 gap-4">
        {['subjective', 'objective', 'assessment', 'plan'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field}</label>
            <textarea
              name={field}
              value={soap[field]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncounterTab;
