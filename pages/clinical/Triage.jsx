// import React, { useState } from 'react'
// import { IoAdd } from "react-icons/io5";
// import TriageForm from '../../components/forms/TriageForm';


// const Triage = () => {
//   const [selectedPatient, setSelectedPatient] = React.useState(null);

  


// const fetchQueuedPatients = async () => {
//     // Fetch triage data from local storage 
//     const queuedPatients = localStorage.getItem('queuedPatients');
//     if (queuedPatients) {
//         return JSON.parse(queuedPatients);
//     }
//     return [];
// }
// const [patients, setPatients] = React.useState([]);
// React.useEffect(() => {
//     const getPatients = async () => {
//         const data = await fetchQueuedPatients();
//         setPatients(data);
//     }
//     getPatients();

// }, [])






//     const handleView = (patient) => {
//       setSelectedPatient(patient);
//       fetchTriageDataByPatientId(patient.id)
//   };
//     const handleSearch = (e) => {
//         // Handle search action here
//         console.log(`Search for patient: ${e.target.value}`);
//     }
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         // Handle search submit action here
//         console.log(`Search submitted`);
//     }



//     // console.log("selected patient",selectedPatient)
// // open triage from only if theres a selected patient 
// const openTriageFom = () => {
//     if (selectedPatient) {
//         document.getElementById('my_modal_3').showModal();
//         // console.log("selectedPatient is",selectedPatient)
//     } else {
//         alert("Please select a patient first");
//     }

// }
// const [generalExamination, setGeneralExamination] = useState(null)
// // fetch triage data from local storage by patient id 
// const fetchTriageDataByPatientId =  (patientId) => {
//     // console.log("Fetching triage data for patient ID:", patientId);
//     const triageData = localStorage.getItem('triageData');

//     const data = JSON.parse(triageData);     
//     const patientGe= data.filter(item => item.user_id == patientId);
   

//     //  console.log("patientGe", patientGe);
//     if(patientGe){
//         setGeneralExamination(patientGe[0]);  
//         // console.log("Fetched triage data:", data);
//     }else{
//         console.log("No triage data found for patient ID:", patientId);
//     }
    



// }



// const getAssementColor = (triageColor) => {
//     let colorClass = '';
//     let colorText = '';

//     switch (triageColor) {
//         case 'green':
//         return { colorClass: 'bg-green-500', colorText: 'Normal' };
     
//         case 'orange':
//             return { colorClass: 'bg-orange-500', colorText: 'Abnormal' };
  
            
//         case 'red':

//         return { colorClass: 'bg-red-500', colorText: 'Urgent' };

            
//         default:
//             return { colorClass: '', colorText: 'Unknown' };
   
//     }

    

// }
// const { colorClass, colorText } = getAssementColor(generalExamination?.triageColor || '');
// // console.log(getAssementColor("red"))


//   return (
//     <div>

    
// <div className="grid grid-cols-2 gap-5">
// <div className='bg-white p-5 rounded bg-white p-5 rounded'>
//          <p className='text-primary text-md'> Patient Queue</p>
//             <table className='w-full mt-5 text-xs'>
//                 <thead>
//                     <th className='text-left'>Queue No</th>
//                     <th className='text-left'>Patient Name</th>
//                     <th className='text-left'>Action</th>
//                 </thead>
//                 <tbody>
//                     {patients.map((patient) => (
//                         <tr key={patient.id} className={`${patient.id % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}`}>
//                             <td>{patient.id}</td>
//                             <td>{patient.name}</td>
//                             <td className='flex gap-5 items-center'>
//                                 <p className='text-primary underline cursor-pointer' onClick={() => handleView(patient)}>View</p>
//                            <button>Send to consultation</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
  
//         <div className='bg-white p-5 rounded bg-white p-5 rounded  space-y-3'> 
//          <p className='text-primary text-md'> Patient Details</p>
//          <div  className='flex items-center justify-between bg-gray-100 p-2 rounded'> 
//             <h2>Fullname</h2>
//             <p>{selectedPatient?.name || "N/A"}</p>
//          </div>
//          <div  className='flex items-center justify-between  p-2 ' > 
//             <h2>ID Number</h2>
//             <p>{selectedPatient?.id_number || "N/A"}</p>
//          </div>        
//           <div  className='flex items-center justify-between bg-gray-100 p-2 rounded'> 
//             <h2>Phone</h2>
//             < p>{selectedPatient?.phone || "N/A"}</p>
//          </div>  
//                 <div  className='flex items-center justify-between  p-2 '> 
//             <h2>Sex</h2>
//             <p>{selectedPatient?.sex || "N/A"}</p>
//          </div>        
        
//         </div>
//         <div className='bg-white p-5 rounded bg-white p-5 rounded  space-y-3'> 
//             <div className="flex justify-between items-center">
//             <p className='text-primary text-md'>General Examination</p>
//             {/* <IoAdd onClick={()=>document.getElementById('my_modal_3').showModal()} size={25} className='bg-primary  text-white cursor-pointer rounded'/> */}
//             <IoAdd onClick={openTriageFom} size={25} className='bg-primary  text-white cursor-pointer rounded'/>

//             </div>  
//             <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
//             <h2>Height</h2>
//             <p>{generalExamination?.vitals.height || "N/A"} m</p>
//             </div>
//             <div className='flex items-center justify-between p-2'>
//             <h2>Weight</h2>
//             <p>{generalExamination?.vitals.weight || "N/A"  } kg</p>
//             </div>
//             <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
//             <h2>Blood Pressure</h2>
//             <p> {generalExamination?.vitals.systolic || "N/A" }/{generalExamination?.vitals.diastolic || "N/A" }</p>                
//            </div>
//             <div className='flex items-center justify-between p-2'>
//             <h2>Temperature</h2>
//             <p>{generalExamination?.vitals.temperature || "N/A" }°C</p>
//             </div>
//             <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
//             <h2>Pulse</h2>
//             <p>{generalExamination?.vitals.pulse || "N/A"} bpm</p>
//             </div>
//             {/* <div className='flex items-center justify-between p-2'>
//             <h2>Respiration Rate</h2>
//             <p>20 breaths/min</p>
//             </div> */}
//             <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
//             <h2>Oxygen Saturation</h2>
//             <p>{generalExamination?.vitals.oxygenSaturation || "N/A"}%</p>

//             </div>
  
//             <div className='flex items-center justify-between p-2'>
//             <h2>Pain Scale</h2>
//             <p>{generalExamination?.pain || "N/A"}</p>
//             </div>
//             <div className='flex items-center justify-between p-2'>
//             <h2>Assessment by color</h2>
//             {/* <p className='bg-green-500 px-4 py-2 rounded text-white '>{generalExamination?.triageColor || "N/A"}</p> */}
//             <p className={`px-4 py-2 rounded text-white ${colorClass}`}>{colorText || "N/A"}</p>
//             </div>
              
//         </div>
// </div>

// <dialog id="my_modal_3" className="modal ">
//   <div className="modal-box w-full max-w-5xl">
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//     </form>
//     <h3 className="font-bold text-md">Triage General Examination</h3>
//     <TriageForm  patientId={selectedPatient?.id}/>

//   </div>
// </dialog>
// </div>
//   ) 
// }

// export default Triage

import React, { useState, useEffect } from 'react'
import { IoAdd } from "react-icons/io5";
import TriageForm from '../../components/forms/TriageForm';
import { toast } from 'react-hot-toast';

const Triage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [generalExamination, setGeneralExamination] = useState(null);

  const fetchQueuedPatients = async () => {
    const queuedPatients = localStorage.getItem('queuedPatients');
    return queuedPatients ? JSON.parse(queuedPatients) : [];
  };

  useEffect(() => {
    const getPatients = async () => {
      const data = await fetchQueuedPatients();
      setPatients(data);
    };
    getPatients();
  }, []);

  const fetchTriageDataByPatientId = (patientId) => {
    const triageData = localStorage.getItem('triageData');
    if (!triageData) return;

    const data = JSON.parse(triageData);
    const patientGe = data.find(item => item.user_id === patientId);

    if (patientGe) {
      setGeneralExamination(patientGe);
    } else {
      setGeneralExamination(null);
    }
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    fetchTriageDataByPatientId(patient.id);
  };

  const openTriageFom = () => {
    if (selectedPatient) {
      document.getElementById('my_modal_3').showModal();
    } else {
      alert("Please select a patient first");
    }
  };

  const getAssementColor = (triageColor) => {
    switch (triageColor) {
      case 'green':
        return { colorClass: 'bg-green-500', colorText: 'Normal' };
      case 'orange':
        return { colorClass: 'bg-orange-500', colorText: 'Abnormal' };
      case 'red':
        return { colorClass: 'bg-red-500', colorText: 'Urgent' };
      default:
        return { colorClass: '', colorText: 'Unknown' };
    }
  };

  const { colorClass, colorText } = getAssementColor(generalExamination?.triageColor || '');

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Patient Queue */}
      <div className='bg-white p-5 rounded'>
        <p className='text-primary text-md'> Patient Queue</p>
        <table className='w-full mt-5 text-xs'>
          <thead>
            <tr>
              <th className='text-left'>Queue No</th>
              <th className='text-left'>Patient Name</th>
              <th className='text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className={`${patient.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td className='flex gap-5 items-center'>
                  <p className='text-primary underline cursor-pointer' onClick={() => handleView(patient)}>View</p>
                  {generalExamination?.user_id === patient.id && (
                    <button className='bg-primary text-white px-2 py-1 rounded'>Send to consultation</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Details */}
      <div className='bg-white p-5 rounded space-y-3'>
        <p className='text-primary text-md'> Patient Details</p>
        <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
          <h2>Fullname</h2>
          <p>{selectedPatient?.name || "N/A"}</p>
        </div>
        <div className='flex items-center justify-between p-2'>
          <h2>ID Number</h2>
          <p>{selectedPatient?.id_number || "N/A"}</p>
        </div>
        <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
          <h2>Phone</h2>
          <p>{selectedPatient?.phone || "N/A"}</p>
        </div>
        <div className='flex items-center justify-between p-2'>
          <h2>Sex</h2>
          <p>{selectedPatient?.sex || "N/A"}</p>
        </div>
      </div>

      {/* General Examination */}
      <div className='bg-white p-5 rounded space-y-3'>
        <div className="flex justify-between items-center">
          <p className='text-primary text-md'>General Examination</p>
          <IoAdd onClick={openTriageFom} size={25} className='bg-primary text-white cursor-pointer rounded' />
        </div>
        <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
          <h2>Height</h2>
          <p>{generalExamination?.vitals.height || "N/A"} m</p>
        </div>
        <div className='flex items-center justify-between p-2'>
          <h2>Weight</h2>
          <p>{generalExamination?.vitals.weight || "N/A"} kg</p>
        </div>
        <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
          <h2>Blood Pressure</h2>
          <p>{generalExamination?.vitals.systolic || "N/A"}/{generalExamination?.vitals.diastolic || "N/A"}</p>
        </div>
        <div className='flex items-center justify-between p-2'>
          <h2>Temperature</h2>
          <p>{generalExamination?.vitals.temperature || "N/A"}°C</p>
        </div>
        <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
          <h2>Pulse</h2>
          <p>{generalExamination?.vitals.pulse || "N/A"} bpm</p>
        </div>
        <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
          <h2>Oxygen Saturation</h2>
          <p>{generalExamination?.vitals.oxygenSaturation || "N/A"}%</p>
        </div>
        <div className='flex items-center justify-between p-2'>
          <h2>Pain Scale</h2>
          <p>{generalExamination?.pain || "N/A"}</p>
        </div>
        <div className='flex items-center justify-between p-2'>
          <h2>Assessment by color</h2>
          <p className={`px-4 py-2 rounded text-white ${colorClass}`}>{colorText || "N/A"}</p>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-md">Triage General Examination</h3>
          <TriageForm patientId={selectedPatient?.id} />
        </div>
      </dialog>
    </div>
  );
};

export default Triage;
