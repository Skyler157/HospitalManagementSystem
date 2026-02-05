import React, { useState, useEffect } from 'react';

function PlanTab({ selectedPatient }) {
  const storageKey = `treatmentPlan_${selectedPatient?.id || 'default'}`;
  const [plan, setPlan] = useState([]);
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');
  const [referral, setReferral] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [signature, setSignature] = useState('');

  // Load plan from localStorage or selectedPatient on mount or when selectedPatient changes
  useEffect(() => {
    const storedPlan = localStorage.getItem(storageKey);
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    } else if (selectedPatient?.treatmentPlan) {
      setPlan(selectedPatient.treatmentPlan);
      localStorage.setItem(storageKey, JSON.stringify(selectedPatient.treatmentPlan));
    } else {
      setPlan([]);
      localStorage.removeItem(storageKey);
    }
  }, [selectedPatient, storageKey]);

  // Save plan to localStorage whenever plan changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(plan));
  }, [plan, storageKey]);

  const handleAddPlan = () => {
    if (!medication || !dosage || !duration) return;

    const newEntry = {
      medication,
      dosage,
      duration,
      referral,
      followUpDate,
      signature,
    };

    setPlan(prevPlan => [...prevPlan, newEntry]);

    // Clear form
    setMedication('');
    setDosage('');
    setDuration('');
    setReferral('');
    setFollowUpDate('');
    setSignature('');
  };

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-4">Treatment Plan</h3>

      <div className="space-y-3 mb-6 bg-white p-4 rounded shadow-sm border">
        <input
          type="text"
          value={medication}
          onChange={e => setMedication(e.target.value)}
          placeholder="Medication"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          placeholder="Dosage (e.g., 1 tablet twice daily)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          placeholder="Duration (e.g., 5 days)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={referral}
          onChange={e => setReferral(e.target.value)}
          placeholder="Referral (optional, e.g., Cardiologist)"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={followUpDate}
          onChange={e => setFollowUpDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={signature}
          onChange={e => setSignature(e.target.value)}
          placeholder="Doctor's Signature"
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAddPlan}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Plan
        </button>
      </div>

      {plan.length > 0 ? (
        <ul className="space-y-2">
          {plan.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded">
              <p><strong>Medication:</strong> {item.medication}</p>
              <p><strong>Dosage:</strong> {item.dosage}</p>
              <p><strong>Duration:</strong> {item.duration}</p>
              {item.referral && <p><strong>Referral:</strong> {item.referral}</p>}
              {item.followUpDate && <p><strong>Follow-Up:</strong> {item.followUpDate}</p>}
              {item.signature && <p><strong>Doctor's Signature:</strong> {item.signature}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">No treatment plan available.</p>
        </div>
      )}
    </div>
  );
}

export default PlanTab;
