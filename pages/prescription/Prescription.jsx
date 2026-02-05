import { Delete, DeleteIcon, EditIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { BiEdit, BiEditAlt, BiSolidSave } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import { GoPlus } from 'react-icons/go';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '', medication: '', dosage: '', instructions: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("prescriptions") || "[]");
    setPrescriptions(stored);
  }, []);

  const saveToStorage = (data) => {
    sessionStorage.setItem("prescriptions", JSON.stringify(data));
  };

  const addPrescription = (e) => {
    e.preventDefault();
    const { patientName, medication, dosage, instructions } = newPrescription;
    if (!patientName || !medication) {
      return toast.error('Patient name and medication are required');
    }

    const newEntry = { ...newPrescription, id: Date.now() };
    const updated = [...prescriptions, newEntry];
    setPrescriptions(updated);
    saveToStorage(updated);
    setNewPrescription({ patientName: '', medication: '', dosage: '', instructions: '' });
    toast.success('Prescription added');
    setShowModal(false);
  };

  const deletePrescription = (id) => {
    const updated = prescriptions.filter(p => p.id !== id);
    setPrescriptions(updated);
    saveToStorage(updated);
    toast.success('Prescription deleted');
    if (editIndex !== null && prescriptions[editIndex]?.id === id) {
      setEditIndex(null);
      setEditData({});
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...prescriptions[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updated = [...prescriptions];
    updated[editIndex] = editData;
    setPrescriptions(updated);
    saveToStorage(updated);
    setEditIndex(null);
    setEditData({});
    toast.success('Prescription updated');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditData({});
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-1 mx-10 gap-6">
      <Toaster />

      <div className="col-span-2 px-10">
        <h1 className="text-xl font-bold mb-6 text-center uppercase">Prescription</h1>

      {/*Setting up modal for additng prescription*/}
      {showModal && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
            <button 
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <h2 className="font-semibold mb-4 text-lg">Create New Prescription</h2>
          <form onSubmit={addPrescription} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text" name="patientName" placeholder="Patient Name"
              value={newPrescription.patientName}
              onChange={(e) => setNewPrescription({ ...newPrescription, patientName: e.target.value })}
              className="border p-2 rounded hover:shadow"
              required
            />
            <input
              type="text" name="medication" placeholder="Medication"
              value={newPrescription.medication}
              onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
              className="border p-2 rounded hover:shadow"
              required
            />
            <input
              type="text" name="dosage" placeholder="Dosage"
              value={newPrescription.dosage}
              onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
              className="border p-2 rounded hover:shadow"
            />
            <input
              type="text" name="instructions" placeholder="Instructions"
              value={newPrescription.instructions}
              onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
              className="border p-2 rounded hover:shadow"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full col-span-full mx-auto w-1/2 hover:bg-blue-500">
              Add Prescription
            </button>
          </form> 
          </div> 
          </div> 
      )}


        {/* Prescription Table */}
        <section className="mb-8">
          <div className='flex justify-between'>
          <h2 className="font-semibold mb-4 text-lg"></h2>
          <GoPlus className='hover:bg-blue-500 hover:text-white hover:rounded text-2xl text-blue-500 mb-4 cursor-pointer' title='Add Prescription' onClick={() => setShowModal(true)} />
          </div>
          <table className="w-full border table-auto shadow-lg bg-gray-100">
            <thead>
              <tr className="bg-slate-400">
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Medication</th>
                <th className="p-2 border">Dosage</th>
                <th className="p-2 border">Instructions</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.length === 0 ? (
                <tr><td colSpan="5" className="text-center p-4">No prescriptions.</td></tr>
              ) : (

                prescriptions.map((pres, index) => (
                  <tr key={pres.id} className={`${index % 2 === 0 ? 'bg-gray-100 text-center' : 'bg-white text-center'}`}>
                    {editIndex === index ? (
                      <>
                        <td className="p-2 border">
                          <input
                            name="patientName"
                            value={editData.patientName}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="medication"
                            value={editData.medication}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="dosage"
                            value={editData.dosage}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="instructions"
                            value={editData.instructions}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border flex">
                          <button onClick={saveEdit} title='Update' className="hover:text-green-600 px-2 py-1 rounded mr-2">
                            <BiSolidSave size={15} />
                          </button>
                          <button onClick={cancelEdit} title='Cancel' className="text-white px-2 py-1 rounded"><FcCancel size={15}/></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 border">{pres.patientName}</td>
                        <td className="p-2 border">{pres.medication}</td>
                        <td className="p-2 border">{pres.dosage}</td>
                        <td className="p-2 border">{pres.instructions}</td>
                        <td className="p-2 border">
                          <button onClick={() => startEdit(index)} title='Edit' className="hover:text-blue-600 px-2 py-1 rounded mr-2"><BiEdit  size={15} /></button>
                          <button onClick={() => deletePrescription(pres.id)} className="px-2 py-1 rounded hover:text-red-500" title='delete'><DeleteIcon size={15}/></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Prescription;
