import React, { useState, useRef, useEffect } from 'react';
import { BsXLg } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import TriageForm from '../../components/forms/TriageForm';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Registry = () => {

  const navigate=useNavigate()
  const [menuOpen, setMenuOpen] = useState(null);
  const [search, setSearch] = useState('');
  const [modalType, setModalType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const menuRef = useRef(null);
  const modalRef = useRef(null);


const [patients, setPatients] = useState([])
const [formData, setFormData] = useState({
  name: '',
  phone_number: '',
  dob: '',
  id_number: '',
  residence: '',
  id_type:"",
  sex:"",
  occupation:"",
  email:"",
  kin_name:"",
  kin_relationship:"",
  kin_contact:""


});
const [queuedIds, setQueuedIds] = useState(() => {
  const stored = localStorage.getItem('queuedPatients');
  try {
    return Array.isArray(JSON.parse(stored))
      ? JSON.parse(stored).map((p) => p.id)
      : [];
  } catch {
    return [];
  }
});


  // Load patients from localStorage on component mount
  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const filteredPatients = patients.filter((patient) =>
    Object.values(patient)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const openModal = (type, patient = null) => {
    setModalType(type);
    setSelectedPatient(patient);
    document.getElementById('dynamic_modal').showModal();
  };
//   id types
  const idTypes = [
    { id: 1, name: 'National ID' },
    { id: 2, name: 'Passport' },
    { id: 3, name: 'Driver\'s License' },
    { id: 4, name: 'Birth Certificate' },
    { id: 5, name: 'Student ID' },
    { id: 6, name: 'Military ID' },
  ];
//   sex types
const sexTypes=[
    { id: 1, name: 'Choose not to say' },
    { id: 2, name: 'Male' },
    { id: 3, name: 'Female' },
    { id: 4, name: 'Other' },

  ];
//   occupation types
const occupation=[
    { id: 1, name: 'Pilot' },
    { id: 2, name: 'Doctor' },
    { id: 3, name: 'Nurse' },
    { id: 4, name: 'Pharmacist' },
    { id: 5, name: 'Lab Technician' },
    { id: 6, name: 'Receptionist' },
    { id: 7, name: 'Softaware Engineer' },

  ];
//   departments
const departments = [
    { id: 1, name: 'Emergency' },
    { id: 2, name: 'Outpatient' },
    { id: 3, name: 'Inpatient' },
    { id: 4, name: 'Pediatrics' },
    { id: 5, name: 'Maternity' },
    { id: 6, name: 'Surgery' },
    { id: 7, name: 'Radiology' },
    { id: 8, name: 'Laboratory' },
    { id: 9, name: 'Pharmacy' },
    { id: 10, name: 'Cardiology' },
    { id: 11, name: 'Orthopedics' },
    { id: 12, name: 'Dermatology' },
    { id: 13, name: 'ENT (Ear, Nose, Throat)' },
    { id: 14, name: 'Ophthalmology' },
    { id: 15, name: 'Oncology' },
    { id: 16, name: 'Neurology' },
    { id: 17, name: 'Psychiatry' },
    { id: 18, name: 'Physiotherapy' },
    { id: 19, name: 'ICU (Intensive Care Unit)' },
    { id: 20, name: 'Dental' }
  ];
  


// const handleAdd=()=>{
//     console.log("ADD PATIENT");
// }
// const handleQueue=(triageData)=>{
  // console.log("triageData",triageData);
// }


  // Save patients to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('patients', JSON.stringify(patients));
  // }, [patients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      ...formData
    };
    setPatients(prev => [...prev, newPatient]);
// store patients in local storage
    localStorage.setItem('patients', JSON.stringify([...patients, newPatient]));  

    setFormData({
      name: '',
      phone_number: '',
      dob: '',
      id_number: '',
      residence: '',
      id_type:"",
      sex:"",
      occupation:"",
      email:"",
      kin_name:"",
      kin_relationship:"",
      kin_contact:""
    })
    if (modalRef.current) {
      modalRef.current.close();
    }
  };



  const triageRef = useRef();

  const handleQueueClick = () => {
    if (triageRef.current) {
      triageRef.current.submitToQueue(); // 👈 call method inside TriageForm
    }
  };
  // delet user
  const handleDelete = (patient) => {
    // remove patient from local storage by id using localstorage.removeItem
    const updatedPatients = patients.filter(p => p.id !== patient.id);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
toast.success('Patient deleted successfully')

  }


  const handleview=(patient)=>{
navigate(`${patient.id}`);

  }
// handle queue
const [isQueued, setIsQueued] = useState(false)

// const handleQueue = (patient) => {
//   try {
//     const item = localStorage.getItem('queuedPatients');
//     const stored = Array.isArray(JSON.parse(item)) ? JSON.parse(item) : [];
//     const updated = [...stored, patient];
//     localStorage.setItem('queuedPatients', JSON.stringify(updated));
//     toast.success('Patient queued successfully!');
//     setIsQueued(true);
//   } catch (error) {
//     console.error('Error handling queue:', error);
//     toast.error('Failed to queue patient.');
//   }
// };

const handleQueue = (patient) => {
  try {
    const item = localStorage.getItem('queuedPatients');
    const stored = Array.isArray(JSON.parse(item)) ? JSON.parse(item) : [];
    const updated = [...stored, patient];
    localStorage.setItem('queuedPatients', JSON.stringify(updated));
    setQueuedIds((prev) => [...prev, patient.id]); // update state
    toast.success('Patient queued successfully!');
    document.getElementById('dynamic_modal')?.close(); // close modal
  } catch (error) {
    console.error('Error handling queue:', error);
    toast.error('Failed to queue patient.');
  }
};



  // console.log("queued patients",stored);
  return (
    <div className='p-4'>
      <div className='flex flex-wrap items-center justify-between gap-4 mb-4'>
        <p className='font-semibold'>Patients</p>
        <input
          type='text'
          placeholder='Search patients by name, phone or id number'
          className='border px-2 py-1.5 rounded text-sm w-full max-w-xs'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => openModal('add')}
          className='bg-primary py-2 px-4 text-white rounded whitespace-nowrap'
        >
          Add Patient
        </button>
      </div>

      <table className='w-full text-xs'>
        <thead>
          <tr>
            <th className='text-left p-2'>PATIENT NAME</th>
            <th className='text-left p-2'>PHONE</th>
            <th className='text-left p-2'>DOB</th>
            <th className='text-left p-2'>ID NO</th>
            <th className='text-left p-2'>RESIDENCE</th>
            <th className='text-left p-2'>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr
              key={patient.id}
              className={`${patient.id % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}`}
            >
              <td className='px-2'>{patient.name}</td>
              <td className='px-2'>{patient.phone}</td>
              <td className='px-2'>{patient.dob}</td>
              <td className='px-2'>{patient.id_number}</td>
              <td className='px-2'>{patient.residence}</td>
              {/* <td>
                <p   onClick={()=>handleQueue(patient)} className='underline text-blue-500 cursor-pointer'>{isQueued ? "queed":"Queue"}</p>
              </td> */}

<td>
  {queuedIds.includes(patient.id) ? (
    <span className="text-green-600 font-semibold">Queued</span>
  ) : (
    <p
      onClick={() => handleQueue(patient)}
      className="underline text-blue-500 cursor-pointer"
    >
      Queue
    </p>
  )}
</td>
              {/* <td className='relative px-2'>
                <button onClick={() => toggleMenu(patient.id)}>
                  <CiMenuKebab size={20} />
                </button>

                {menuOpen === patient.id && (
                  <div
                    ref={menuRef}
                    className='absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm z-10'
                  >
                    <ul>
                      <li onClick={()=>handleview(patient)}  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>View</li>
                      <li
                        onClick={() => openModal('queue', patient)}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      >
                        Queue Patient
                      </li>
                      <li onClick={()=>handleDelete(patient)} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Delete</li>
         o
                    </ul>
                  </div>
                )}
              </td> */}
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="6" className='text-center py-4 text-gray-500'>No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {/* <dialog id="dynamic_modal" className="modal"> */}
      <dialog ref={modalRef} id="dynamic_modal" className="modal">
        <div className={` modal-box ${modalType === 'add' ? 'w-11/12 max-w-6xl' : 'w-11/12 max-w-4xl'}`}>
          <h3 className="font-bold text-lg mb-4">
            {modalType === 'add' && 'Add New Patient'}
            {modalType === 'queue' && `Add ${selectedPatient?.name} To Queue`}
          </h3>

          {modalType === 'add' && (
            <div>
                <form className='gap-7 grid grid-cols-3 '>
                    {/* <div className="grid grid-cols-3 gap-3"> */}
                        <div>
                        <label className="block text-sm font-medium mb-1">Patient Name</label>
                        <input required name='name' type="text" onChange={handleChange} className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Phone number</label>
                        <input required name="phone" type="text" onChange={handleChange} className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Id Type</label>

                        <select required  onChange={handleChange} name="id_type" className='border px-2 py-1 rounded w-full' id="">
                            <option >Select Id type</option>
                        {idTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Id number</label>
                        <input required  onChange={handleChange} name="id_number" type="text" className="border px-2 py-1 rounded w-full" />
                        </div>
                    {/* </div> */}
                    {/* <div className="grid grid-cols-3 gap-3"> */}
                        <div>
                        <label className="block text-sm font-medium mb-1">Residence</label>
                        <input onChange={handleChange} name="residence" type="text" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Date Of Birth</label>
                        <input onChange={handleChange} name="dob" type="date" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Sex </label>
                        <select onChange={handleChange} name="sex" className='border px-2 py-1 rounded w-full' id="">
                            <option>Select sex</option>
                        {sexTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                    {/* </div> */}
                    {/* <div className="grid grid-cols-3 gap-3"> */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Occupation </label>
                        <select onChange={handleChange} name="occupation" className='border px-2 py-1 rounded w-full' id="">
                            <option >Select occupation</option>
                        {occupation.map((type) => (
                            // select 
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input onChange={handleChange} name="email" type="email" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Next of Kin Name</label>
                        <input onChange={handleChange} name="kin_name" type="text" className="border px-2 py-1 rounded w-full" />
                        </div>            <div>
                        <label className="block text-sm font-medium mb-1">Next of Kin Relationship</label>
                        <input onChange={handleChange} name="kin_relationship" type="text" className="border px-2 py-1 rounded w-full" />
                        </div>            <div>
                        <label onChange={handleChange} name="kin_contact" className="block text-sm font-medium mb-1">Next of Kin Contact</label>
                        <input type="number" className="border px-2 py-1 rounded w-full" />
                        </div>
    
                    {/* </div> */}
                    
 
                </form>
            </div>
          )}

          {modalType === 'queue' && (
            <div>
            <form className='grid grid-cols-2 gap-7'>
            <div
            >
                        <label className="block text-sm font-medium mb-1">From</label>

                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option >Select from  department</option>
                        {departments.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                        <div
                        >
                        <label className="block text-sm font-medium mb-1">To</label>

                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option >Select to department</option>
                        {departments.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
            </form>
                        <TriageForm selectedPatient={selectedPatient?.name} ref={triageRef}/>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              
              <button className="btn bg-red-500 text-white">Close</button>
            </form>
              <button onClick={modalType==="queue"? handleQueueClick: handleAdd} className="bg-primary text-white px-4 py-1.5 rounded">{modalType === "queue" ?"Queue patient":"Add patient"}</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Registry;
