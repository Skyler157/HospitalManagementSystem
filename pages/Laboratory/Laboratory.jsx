import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { BsPencilSquare, BsTrash3 } from 'react-icons/bs';

const commonTests = [
  'Complete Blood Count (CBC)', 'Malaria Smear', 'CD4 Count',
  'Blood Glucose', 'Urinalysis', 'Liver Function Test',
  'Kidney Function Test', 'HIV Viral Load', 'Pregnancy Test',
];

const Laboratory = () => {
  const [testOrders, setTestOrders] = useState([]);
  const [testResults, setTestResults] = useState(() => {
    const stored = sessionStorage.getItem('testResults');
    return stored ? JSON.parse(stored) : [];
  });

  const [newOrder, setNewOrder] = useState('');
  const [patientName, setPatientName] = useState('');
  const [resultEntry, setResultEntry] = useState({
    testName: '', resultValue: '', normalRange: '',
    criticalLow: '', criticalHigh: ''
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [editResultIndex, setEditResultIndex] = useState(null);
  const [editResultFormData, setEditResultFormData] = useState({
    testName: '', resultValue: '', normalRange: '',
    criticalLow: '', criticalHigh: '', enteredAt: ''
  });

  useEffect(() => {
    const stored = sessionStorage.getItem('testOrders');
    setTestOrders(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('testResults', JSON.stringify(testResults));
  }, [testResults]);

  const addTestOrder = (e) => {
    e.preventDefault();
    
    if (!newOrder || !patientName) {
      toast.error('Please enter patient name and select a test');
      return;
    }

    const order = {
      id: Date.now(),
      testName: newOrder,
      patientName: patientName,
      status: 'pending',
      orderedAt: new Date().toLocaleString()
    };

    setTestOrders(prevOrders => [...prevOrders, order]);
    
    setNewOrder('');
    setPatientName('');
    
    toast.success(`Test order for "${order.testName}" added successfully`);
  };

  const handleResultChange = (e) => {
    const { name, value } = e.target;
    setResultEntry(prev => ({ ...prev, [name]: value }));
  };

  const saveTestResult = (e) => {
    e.preventDefault();
    if (!resultEntry.testName || !resultEntry.resultValue) {
      toast.error('Please fill in test name and result value');
      return;
    }
    // Find patientName from pending testOrders for the testName
    const matchingOrder = testOrders.find(order =>
      order.testName === resultEntry.testName && order.status === 'pending'
    );
    const patientName = matchingOrder ? matchingOrder.patientName : '';

    const result = {
      id: Date.now(),
      ...resultEntry,
      patientName: patientName,
      enteredAt: new Date().toLocaleString(),
    };
    setTestResults([...testResults, result]);
    setTestOrders(prev => prev.map(order =>
      order.testName === resultEntry.testName && order.status === 'pending'
        ? { ...order, status: 'completed' }
        : order
    ));
    setResultEntry({
      testName: '', resultValue: '', normalRange: '',
      criticalLow: '', criticalHigh: ''
    });
    toast.success('Test result saved');
  };

  const filteredOrders = testOrders.filter(order =>
    filterStatus === 'all' ? true : order.status === filterStatus
  );

  const isCritical = (result) => {
    const val = parseFloat(result.resultValue);
    const low = parseFloat(result.criticalLow);
    const high = parseFloat(result.criticalHigh);
    return (!isNaN(low) && val < low) || (!isNaN(high) && val > high);
  };

  const notifyClinician = (result) => {
    toast(`Clinician notified for critical result: ${result.testName}`);
  };

  const editTestResult = (index) => {
    const result = testResults[index];
    setEditResultFormData({ ...result });
    setEditResultIndex(index);
  };

  const handleEditResultChange = (e) => {
    const { name, value } = e.target;
    setEditResultFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveEditedTestResult = (index) => {
    const updated = [...testResults];
    updated[index] = editResultFormData;
    setTestResults(updated);
    setEditResultIndex(null);
    toast.success('Test result updated successfully!');
  };

  const cancelEditResult = () => setEditResultIndex(null);

  const deleteTestResult = (index) => {
    const updated = testResults.filter((_, i) => i !== index);
    setTestResults(updated);
    if (editResultIndex === index) setEditResultIndex(null);
    toast.success('Test result deleted successfully!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Toaster />

      <div className="col-span-2 px-10">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">Laboratory</h1>

        {/* Order Test */}
        <section className="mb-8 border p-4 rounded shadow-lg bg-gray-100">
          <h2 className="font-semibold mb-4">Order Test</h2>
          <form onSubmit={addTestOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <select
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
              className="border p-2 rounded"
              required
            >
              <option value="">Select a test</option>
              {commonTests.map((test, idx) => (
                <option key={idx} value={test}>{test}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full col-span-full w-1/2 mx-auto">
              Add Order
            </button>
          </form>
        </section>

        {/* Orders */}
        <section className="mb-8">
          <h2 className="font-semibold mb-4">Test Orders</h2>
          <div className="mb-2 space-x-4">
            {['all', 'pending', 'completed'].map(status => (
              <label key={status}>
                <input
                  type="radio"
                  name="filter"
                  value={status}
                  checked={filterStatus === status}
                  onChange={() => setFilterStatus(status)}
                /> {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>
          <table className="w-full border table-auto shadow-lg bg-gray-100 text-sm">
            <thead>
              <tr className="bg-slate-400 text-center">
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Test Name</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-4">No orders.</td></tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="text-center">
                    <td className="p-2 border">{order.patientName}</td>
                    <td className="p-2 border">{order.testName}</td>
                    <td className="p-2 border capitalize">{order.status}</td>
                    <td className="p-2 border">{order.orderedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Enter Results */}
        <section className="mb-8 border p-4 rounded shadow-lg bg-gray-100">
          <h2 className="font-semibold mb-4">Enter Test Result</h2>
          <form onSubmit={saveTestResult} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="testName"
              value={resultEntry.testName}
              onChange={handleResultChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select test details</option>
              {testOrders
                .filter(order => order.status === 'pending')
                .map(order => (
                  <option key={order.id} value={order.testName}>
                    {order.testName}
                  </option>
                ))}
            </select>

            <input
              type="text" name="resultValue" placeholder="Result Value"
              value={resultEntry.resultValue}
              onChange={handleResultChange} className="border p-2 rounded" required
            />
            <input
              type="text" name="normalRange" placeholder="Normal Range"
              value={resultEntry.normalRange}
              onChange={handleResultChange} className="border p-2 rounded"
            />
            <input
              type="number" name="criticalLow" placeholder="Critical Low"
              value={resultEntry.criticalLow}
              onChange={handleResultChange} className="border p-2 rounded"
            />
            <input
              type="number" name="criticalHigh" placeholder="Critical High"
              value={resultEntry.criticalHigh}
              onChange={handleResultChange} className="border p-2 rounded"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 w-1/2 mx-auto rounded-full col-span-full">
              Save Result
            </button>
          </form>
        </section>
      </div>

      {/* Test Results History */}
      <div className="col-span-1 overflow-auto px-5">
        {testResults.length > 0 && (
          <section className="mt-11">
            <h2 className="font-semibold text-lg mb-2">Test Results History</h2>
            <table className="w-full border bg-gray-100 shadow-lg table-auto text-sm">
              <thead>
                <tr className="bg-slate-400 text-center">
                  <th className="p-2 border">Test Name</th>
                  <th className='p-2 border'>Patient</th>
                  <th className="p-2 border">Value</th>
                  <th className="p-2 border">Normal</th>
                  <th className="p-2 border">Entered</th>
                  <th className="p-2 border">Critical</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {testResults.map((result, index) => {
                  const critical = isCritical(result);
                  if (editResultIndex === index) {
                    return (
                      <tr key={result.id} className={critical ? 'bg-red-100 font-bold' : ''}>
                        <td className="p-2 border">
                          <input
                            name="testName" value={editResultFormData.testName}
                            onChange={handleEditResultChange} className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="patientName" value={editResultFormData.patientName || ''}
                            onChange={handleEditResultChange} className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="resultValue" value={editResultFormData.resultValue}
                            onChange={handleEditResultChange} className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="normalRange" value={editResultFormData.normalRange}
                            onChange={handleEditResultChange} className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">{editResultFormData.enteredAt}</td>
                        <td className="p-2 border">{critical ? 'Yes' : 'No'}</td>
                        <td className="p-2 border space-x-2">
                          <button onClick={() => saveEditedTestResult(index)} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                          <button onClick={cancelEditResult} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={result.id} className={critical ? 'bg-red-100 font-bold' : ''}>
                      <td className="p-2 border">{result.testName}</td>
                      <td className="p-2 border">{result.patientName}</td>
                      <td className="p-2 border">{result.resultValue}</td>
                      <td className="p-2 border">{result.normalRange}</td>
                      <td className="p-2 border">{result.enteredAt}</td>
                      <td className="p-2 border">{critical ? 'Yes' : 'No'}</td>
                      <td className="p-2 border space-x-2">
                        {critical && (
                          <button onClick={() => notifyClinician(result)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500">Notify</button>
                        )}
                        <button onClick={() => editTestResult(index)} className="hover:text-blue-700">
                          <BsPencilSquare className="inline" title="Edit" />
                        </button>
                        <button onClick={() => deleteTestResult(index)} className="hover:text-red-700">
                          <BsTrash3 className="inline" title="Delete" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default Laboratory;
