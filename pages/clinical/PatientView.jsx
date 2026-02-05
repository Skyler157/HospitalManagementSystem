import React from 'react'
import { useParams } from 'react-router-dom'

const PatientView = () => {
  const { patientId } = useParams();

  const storedPatients = localStorage.getItem('patients');
  const patients = storedPatients ? JSON.parse(storedPatients) : [];

  // Ensure both values are strings for comparison
  const patient = patients.find((patient) => String(patient.id) === patientId);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>

<div className="bg-white p-2 rounded space-y-4" >
<h1 className='font-bold border-b pb-3'>{patient.name} Personal Details</h1>
<div className='grid grid-cols-2 gap-4'>
<div>
<p className='font-semibold'>Fullname</p>
<p>{patient.name}</p>
</div>
<div>
<p className='font-semibold'>Phone Number</p>
<p>{patient.phone}</p>
</div>
<div>
<p className='font-semibold'>Email</p>
<p>{patient.email}</p>
</div>
<div>
<p className='font-semibold'>Id Number</p>
<p>{patient.id_number}</p>
</div>
<div>
<p className='font-semibold'>Residence</p>
<p>{patient.residence}</p>
</div><div>
<p className='font-semibold'>Date of Birth</p>
<p>{patient.dob}</p>
</div><div>
<p className='font-semibold'>Next of Kin name</p>
<p>{patient.kin_name}</p>
</div>
<div>
<p className='font-semibold'>Next of kin relationship</p>
<p>{patient.kin_relationship}</p>
</div><div>
<p className='font-semibold'>Next of kin contact</p>
<p>{patient.kin_Contact}</p>
</div>
</div>


</div>
<div className='bg-white p-2 rounded space-y-4'>

<div className='flex items-center justify-between  font-bold border-b pb-3'>
    <p>Nursing note</p>
    <button className='bg-primary text-white rounded'>Add Note</button>
</div>
</div>

    </div>
  );
}

export default PatientView;
