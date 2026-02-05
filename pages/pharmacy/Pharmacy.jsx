import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { FaBarcode } from 'react-icons/fa';

const Pharmacy = () => {
  const [inventory, setInventory] = useState([
    { drugName: 'ARVs', quantity: 90, expiryDate: '2024-12-31', reorderLevel: 80, barcodeId: 'ARV090' },
    { drugName: 'Antibiotics', quantity: 50, expiryDate: '2025-01-15', reorderLevel: 30, barcodeId: 'ANT050' },
    { drugName: 'Pain Relievers', quantity: 120, expiryDate: '2024-11-30', reorderLevel: 80, barcodeId: 'PRL120' },
    { drugName: 'Antimalarials', quantity: 75, expiryDate: '2025-02-28', reorderLevel: 50, barcodeId: 'AML075' },
    { drugName: 'Vaccines', quantity: 200, expiryDate: '2025-03-31', reorderLevel: 50, barcodeId: 'VAC200' },
    { drugName: 'Insulin', quantity: 30, expiryDate: '2024-10-15', reorderLevel: 20, barcodeId: 'INS030' },
    { drugName: 'HIV', quantity: 40, expiryDate: '2024-09-30', reorderLevel: 25, barcodeId: 'HIV040' },
    { drugName: 'HIV', quantity: 40, expiryDate: '2024-09-30', reorderLevel: 25, barcodeId: 'HIV040' },
    { drugName: 'Antidepressants', quantity: 60, expiryDate: '2025-04-15', reorderLevel: 40, barcodeId: 'ANT060' },
    { drugName: 'Antihypertensives', quantity: 80, expiryDate: '2024-12-01', reorderLevel: 60, barcodeId: 'HTN080' },
    { drugName: 'Anticoagulants', quantity: 45, expiryDate: '2025-05-20', reorderLevel: 30, barcodeId: 'ACO045' },
  ]);

  // Update the prescriptions state to match inventory drug names
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: '1', 
      drugName: 'Pain Relievers',
      dosage: '500mg', 
      duration: '5 days', 
      route: 'Oral', 
      status: 'pending', 
      patientId: '12345', 
      paymentConfirmed: false, 
      patientName: 'John Doe' 
    },
    { 
      id: '2', 
      drugName: 'Antibiotics',
      dosage: '200mg', 
      duration: '3 days', 
      route: 'Oral', 
      status: 'pending', 
      patientId: '67890', 
      paymentConfirmed: false, 
      patientName: 'Jane Smith' 
    },
    { 
      id: '3', 
      drugName: 'ARVs',
      dosage: '250mg', 
      duration: '7 days', 
      route: 'Oral', 
      status: 'pending', 
      patientId: '54321', 
      paymentConfirmed: false, 
      patientName: 'Emily Johnson' 
    },
    { 
      id: '4', 
      drugName: 'Antimalarials',
      dosage: '500mg', 
      duration: '30 days', 
      route: 'Oral', 
      status: 'pending', 
      patientId: '11223', 
      paymentConfirmed: false, 
      patientName: 'Michael Brown' 
    },
    { 
      id: '5', 
      drugName: 'Vaccines',
      dosage: '10mg', 
      duration: '14 days', 
      route: 'Intramuscular', 
      status: 'pending', 
      patientId: '44556', 
      paymentConfirmed: false, 
      patientName: 'Jessica Davis' 
    },
    { 
      id: '6', 
      drugName: 'Insulin',
      dosage: '20mg', 
      duration: '30 days', 
      route: 'Subcutaneous', 
      status: 'pending', 
      patientId: '77889', 
      paymentConfirmed: false, 
      patientName: 'Daniel Wilson' 
    },
    {
      id: '7',
      drugName: 'HIV',
      dosage: '300mg',
      duration: '60 days',
      route: 'Oral',
      status: 'pending',
      patientId: '99001',
      paymentConfirmed: false,
      patientName: 'Sarah Johnson'
    },
    {
      id: '8',
      drugName: 'Antidepressants',
      dosage: '50mg',
      duration: '30 days',
      route: 'Oral',
      status: 'pending',
      patientId: '22334',
      paymentConfirmed: false,
      patientName: 'David Lee'
    },
    {
      id: '9',
      drugName: 'Antihypertensives',
      dosage: '100mg',
      duration: '14 days',
      route: 'Oral',
      status: 'pending',
      patientId: '55667',
      paymentConfirmed: false,
      patientName: 'Laura Kim'
    },
    {
      id: '10',
      drugName: 'Anticoagulants',
      dosage: '75mg',
      duration: '30 days',
      route: 'Oral',
      status: 'pending',
      patientId: '88990',
      paymentConfirmed: false,
      patientName: 'James Smith'
    },
  ]);

  const [dispenseForm, setDispenseForm] = useState({ quantity: '', instructions: '', route: '' });
  const [adverseReactions, setAdverseReactions] = useState('');
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [dispensationHistory, setDispensationHistory] = useState([]);
  const [kemsaOrders, setKemsaOrders] = useState([]);
  const [currentInventoryPage, setCurrentInventoryPage] = useState(0);
  const [currentPrescriptionPage, setCurrentPrescriptionPage] = useState(0);
  const [currentDispensationPage, setCurrentDispensationPage] = useState(0);
  const [kemsaOrderStatus, setKemsaOrderStatus] = useState({});
  const itemsPerPage = 10;

  // New state for adverse reactions form
  const [adrForm, setAdrForm] = useState({
    patientName: '',
    patientId: '',
    drugName: '',
    reactionType: '',
    severity: 'mild',
    description: '',
    dateOccurred: '',
    actionTaken: '',
    outcome: ''
  });

  // Add these new states at the top with other state declarations
  const [showAdrModal, setShowAdrModal] = useState(false);
  const [adrSubmissions, setAdrSubmissions] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('dispensationHistory');
    if (savedHistory) {
      setDispensationHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handlePaymentToggle = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paymentConfirmed: !p.paymentConfirmed } : p))
    );
  };

  const handleDispense = (prescription) => {
    if (!prescription.paymentConfirmed) {
      toast.error('Payment not confirmed for this prescription.');
      return;
    }

    // Modified inventory check
    const inventoryItem = inventory.find((item) => 
      item.drugName.toLowerCase().includes(prescription.drugName.toLowerCase()) ||
      prescription.drugName.toLowerCase().includes(item.drugName.toLowerCase())
    );

    if (!inventoryItem || inventoryItem.quantity < 1) {
      toast.error('Insufficient stock for this medication.');
      return;
    }

    // Update inventory
    setInventory(prev =>
      prev.map(item =>
        item.drugName === prescription.drugName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    // Update prescription status
    setPrescriptions(prev =>
      prev.map(p =>
        p.id === prescription.id
          ? { ...p, status: 'dispensed' }
          : p
      )
    );

    // Add to dispensation history
    const newRecord = {
      dispensationId: Date.now(),
      dispensedAt: new Date().toISOString(),
      patientName: prescription.patientName,
      patientId: prescription.patientId,
      drugName: prescription.drugName,
      dosage: prescription.dosage,
      duration: prescription.duration,
      route: prescription.route,
      quantity: 1,
      instructions: 'As prescribed',
      status: 'completed'
    };

    setDispensationHistory(prev => [newRecord, ...prev]);
    localStorage.setItem('dispensationHistory', JSON.stringify([newRecord, ...dispensationHistory]));

    toast.success(`Successfully dispensed ${prescription.drugName} to ${prescription.patientName}`);
  };

  const handleKEMSAReorder = async (item) => {
    try {
      const orderQuantity = item.reorderLevel * 2 - item.quantity;
      if (orderQuantity <= 0) {
        toast.info('Stock is sufficient, no reorder needed.');
        return;
      }

      // Simulate API call
      setKemsaOrderStatus((prev) => ({ ...prev, [item.barcodeId]: 'pending' }));
      toast.success(`KEMSA reorder requested for ${item.drugName} (Qty: ${orderQuantity})`);

      setTimeout(() => {
        setKemsaOrderStatus((prev) => ({ ...prev, [item.barcodeId]: 'success' }));
        toast.success(`KEMSA reorder successful for ${item.drugName}`);
      }, 3000);
    } catch (error) {
      console.error('Reorder error:', error);
      toast.error('Failed to send KEMSA reorder request');
    }
  };

  const paginatedInventory = inventory.slice(
    currentInventoryPage * itemsPerPage,
    (currentInventoryPage + 1) * itemsPerPage
  );

  const paginatedPrescriptions = prescriptions.slice(
    currentPrescriptionPage * itemsPerPage,
    (currentPrescriptionPage + 1) * itemsPerPage
  );

  const paginatedDispensationHistory = dispensationHistory.slice(
    currentDispensationPage * itemsPerPage,
    (currentDispensationPage + 1) * itemsPerPage
  );

  const StockAlerts = () => {
  const lowStockItems = inventory.filter(item => item.quantity < item.reorderLevel);
    
  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-yellow-50 border-t-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="text-sm font-medium text-yellow-800 text-center">Low Stock Alert, Kindly check the inventory</h3>
          <div className="mt-2 text-sm text-yellow-700">

            {/* <ul className="space-y-2">
              {lowStockItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="flex-grow">{item.drugName} - {item.quantity} units left (Below {item.reorderLevel})</span>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

  const handleBarcodeScan = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) {
      toast.error('Please enter or scan a barcode');
      return;
    }

    const matchingDrug = inventory.find(item => item.barcodeId === barcodeInput.trim());

    if (!matchingDrug) {
      toast.error('Invalid barcode or drug not found in inventory');
      return;
    }

    // Show drug details in a toast notification
    toast.success(
      <div>
        <h4 className="font-bold">Drug Found </h4>
        <p>Name: {matchingDrug.drugName}</p>
        <p>Stock: {matchingDrug.quantity} units</p>
        <p>Expires: {matchingDrug.expiryDate}</p>
      </div>,
      {duration: 5000} // Show for 5 seconds
    );

    // Clear the input after scanning
    setBarcodeInput('');
  };

  // Update the handleAdrSubmit function
  const handleAdrSubmit = (e) => {
    e.preventDefault();
    if (!adrForm.patientName || !adrForm.drugName || !adrForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new ADR report with all fields
    const newAdr = {
      ...adrForm,
      reportId: Date.now(),
      reportDate: new Date().toISOString(),
      reportedBy: 'Current Pharmacist'
    };

    // Update submissions array
    setAdrSubmissions(prev => [newAdr, ...prev]);
    
    // Show success message
    toast.success('ADR Report submitted successfully');
    
    // Reset form
    setAdrForm({
      patientName: '',
      patientId: '',
      drugName: '',
      reactionType: '',
      severity: '',
      description: '',
      dateOccurred: '',
      actionTaken: '',
      outcome: ''
    });
    
    // Close modal
    setShowAdrModal(false);
  };

  // Add this new component after other component declarations incl
  const AdrModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-5 max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">New ADR Report</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData(prev => ({...prev, patientName: e.target.value}))}
                  className="border p-2 w-full text-xs rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) => setFormData(prev => ({...prev, patientId: e.target.value}))}
                  className="border p-2 w-full text-xs rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Suspected Drug *
                </label>
                <input
                  type="text"
                  value={formData.drugName}
                  onChange={(e) => setFormData(prev => ({...prev, drugName: e.target.value}))}
                  className="border p-2 w-full text-xs rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Reaction Type
                </label>
                <select
                  value={formData.reactionType}
                  onChange={(e) => setFormData(prev => ({...prev, reactionType: e.target.value}))}
                  className="border p-2 w-full text-xs rounded"
                >
                  <option value="">Select type</option>
                  <option value="allergic">Allergic Reaction</option>
                  <option value="gastrointestinal">Gastrointestinal</option>
                  <option value="dermatological">Dermatological</option>
                  <option value="neurological">Neurological</option>
                  <option value="cardiovascular">Cardiovascular</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Severity Level
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData(prev => ({...prev, severity: e.target.value}))}
                  className="border p-2 w-full text-xs rounded"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="lifeThreatening">Life-threatening</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date Occurred
                </label>
                <input
                  type="date"
                  value={formData.dateOccurred}
                  onChange={(e) => setFormData(prev => ({...prev, dateOccurred: e.target.value}))}
                  className="border p-2 w-full text-xs rounded"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description of Reaction *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({description: e.target.value}))}
                placeholder="Describe the adverse reaction in detail"
                className="border p-2 w-full text-xs rounded"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Action Taken
              </label>
              <select
                value={formData.actionTaken}
                onChange={(e) => setFormData(prev => ({...prev, actionTaken: e.target.value}))}
                className="border p-2 w-full text-xs rounded"
              >
                <option value="">Select action</option>
                <option value="drugStopped">Drug Stopped</option>
                <option value="doseReduced">Dose Reduced</option>
                <option value="additionalTreatment">Additional Treatment Given</option>
                <option value="hospitalization">Hospitalization Required</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Outcome
              </label>
              <select
                value={formData.outcome}
                onChange={(e) => setFormData(prev => ({...prev, outcome: e.target.value}))}
                className="border p-2 w-full text-xs rounded"
              >
                <option value="">Select outcome</option>
                <option value="recovered">Recovered</option>
                <option value="recovering">Recovering</option>
                <option value="notRecovered">Not Recovered</option>
                <option value="unknown">Unknown</option>
                <option value="fatal">Fatal</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700"
              >
                Submit ADR Report
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const [activeTab, setActiveTab] = useState('inventory');  

  return (
    <div className="p-4 text-sm">
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Pharmacy</h2>
      <StockAlerts />
      {/* <div className="p-4 bg-gray-50 rounded-lg"> */}
      {/* Tab Menu */}
      <div className="flex gap-2 mb-4 text-s border-b border-gray-400">
        <button 
          className={`px-3 py-1 rounded-t ${activeTab === "inventory" ? "border-blue-600 border-b text-blue-600" : "bg-gray-200"}`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
        <button 
          className={`px-3 py-1 rounded-t ${activeTab === "prescriptions" ? "border-blue-600 border-b text-blue-600" : "bg-gray-200"}`}
          onClick={() => setActiveTab("prescriptions")}
        >
          Prescriptions
        </button>
        <button 
          className={`px-3 py-1 rounded-t ${activeTab === "history" ? "border-blue-600 border-b text-blue-600" : "bg-gray-200"}`}
          onClick={() => setActiveTab("history")}
        >
          Dispensation History
        </button>
      </div>

      {/* Inventory Section */}
      {activeTab === "inventory" && (
        <section className="mb-6">
          {/* <h3 className="font-semibold mb-2">Inventory</h3> */}
          <div className="overflow-x-auto hover:shadow-lg shadow rounded-b-lg">
            <table className="min-w-full table-auto border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-400">
                  <th className="p-1 border">Drug Name</th>
                  <th className="p-1 border">Quantity</th>
                  <th className="p-1 border">Expiry Date</th>
                  <th className="p-1 border">Reorder Level</th>
                  <th className="p-1 border">Barcode</th>
                  <th className="p-1 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInventory.map((item, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-1 border">{item.drugName}</td>
                    <td className="p-1 border">{item.quantity}</td>
                    <td className="p-1 border">{item.expiryDate}</td>
                    <td className="p-1 border">{item.reorderLevel}</td>
                    <td className="p-1 border">{item.barcodeId}</td>
                    <td className="p-1 border">
                      {item.quantity < item.reorderLevel && (
                        <button
                          onClick={() => handleKEMSAReorder(item)}
                          className="text-xs px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Reorder
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={'← Prev'}
            nextLabel={'Next →'}
            pageCount={Math.ceil(inventory.length / itemsPerPage)}
            onPageChange={({ selected }) => setCurrentInventoryPage(selected)}
            containerClassName="flex justify-center space-x-2 mt-4 text-xs"
            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
            activeClassName="bg-blue-500"
            previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
            nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
          />
        </section>
      )}

      {/* Prescriptions Section */}
      {activeTab === "prescriptions" && (
        <section className="mb-6">
          {/* <h3 className="font-semibold mb-2">Prescriptions</h3> */}
          <div className="overflow-x-auto hover:shadow-lg shadow rounded-b-lg">
            <table className="min-w-full table-auto border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-400">
                  <th className="p-1 border">Patient</th>
                  <th className="p-1 border">Drug</th>
                  <th className="p-1 border">Dosage</th>
                  <th className="p-1 border">Duration</th>
                  <th className="p-1 border">Route</th>
                  <th className="p-1 border">Status</th>
                  <th className="p-1 border">Payment</th>
                  <th className="p-1 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPrescriptions.map((prescription) => (
                  <tr key={prescription.id} className="text-center">
                    <td className="p-1 border">{prescription.patientName}</td>
                    <td className="p-1 border">{prescription.drugName}</td>
                    <td className="p-1 border">{prescription.dosage}</td>
                    <td className="p-1 border">{prescription.duration}</td>
                    <td className="p-1 border">{prescription.route}</td>
                    <td className="p-1 border">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        prescription.status === 'dispensed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </td>
                    <td className="p-1 border">
                      <input
                        type="checkbox"
                        checked={prescription.paymentConfirmed}
                        onChange={() => handlePaymentToggle(prescription.id)}
                        disabled={prescription.status === 'dispensed'}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-1 border">
                      {prescription.status === 'pending' && (
                        <button
                          onClick={() => handleDispense(prescription)}
                          disabled={!prescription.paymentConfirmed}
                          className={`text-xs px-2 py-1 rounded ${
                            prescription.paymentConfirmed
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 cursor-not-allowed'
                          }`}
                        >
                          Dispense
                        </button>
                      )}
                      {prescription.status === 'dispensed' && (
                        <span className="text-xs text-gray-500">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={'← Prev'}
            nextLabel={'Next →'}
            pageCount={Math.ceil(prescriptions.length / itemsPerPage)}
            onPageChange={({ selected }) => setCurrentPrescriptionPage(selected)}
            containerClassName="flex justify-center space-x-2 mt-4 text-xs"
            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
            activeClassName="bg-blue-500"
            previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
            nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
          />
        </section>
      )}

      {/* Dispensation History Section */}
      {activeTab === "history" && (
        <section className="mb-6">
          {/* <h3 className="font-semibold mb-2">Dispensation History</h3> */}
          <div className="overflow-x-auto hover:shadow-lg shadow rounded-b-lg">
            <table className="min-w-full table-auto border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-400">
                  <th className="p-1 border">Date</th>
                  <th className="p-1 border">Patient</th>
                  <th className="p-1 border">Drug</th>
                  <th className="p-1 border">Quantity</th>
                  <th className="p-1 border">Instructions</th>
                  <th className="p-1 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDispensationHistory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No dispensation done yet
                    </td>
                  </tr>
                ) : (
                  paginatedDispensationHistory.map((record) => (
                    <tr key={record.dispensationId} className="text-center">
                      <td className="p-1 border">{new Date(record.dispensedAt).toLocaleDateString()}</td>
                      <td className="p-1 border">{record.patientName}</td>
                      <td className="p-1 border">{record.drugName}</td>
                      <td className="p-1 border">{record.quantity}</td>
                      <td className="p-1 border">{record.instructions}</td>
                      <td className="p-1 border">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={'← Prev'}
            nextLabel={'Next →'}
            pageCount={Math.ceil(dispensationHistory.length / itemsPerPage)}
            onPageChange={({ selected }) => setCurrentDispensationPage(selected)}
            containerClassName="flex justify-center space-x-2 mt-4 text-xs"
            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
            activeClassName="bg-blue-500"
            previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
            nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
          />
        </section>
      )}

      {/* Barcode Input Section - always visible */}
      <section className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2 flex items-center">
          <FaBarcode className="mr-2" />
          Scan Medication Barcode
        </h3>
        <form onSubmit={handleBarcodeScan} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter or scan barcode (e.g. ARV090)"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            className="border p-2 flex-grow text-xs rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700"
          >
            Verify
          </button>
        </form>
      </section>
    {/* </div> */}
    </div>
  );
};

export default Pharmacy;
