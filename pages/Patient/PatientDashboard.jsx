import React, { useState } from 'react';
import './PatientDashboard.css';

const tabs = [
  'Dashboard',
  'Profile',
  'Messages',
  'Appointments',
  'Payments',
  'Medications',
  'Prescriptions',
];



export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Joe Calvin',
    dob: '1990-01-01',
    gender: 'Male',
    phone: '+254 712 289 648',
    email: 'joecalvin@gmail.com',
    nhifStatus: 'Active',
  });
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    doctor: '',
  });
  const [appointments, setAppointments] = useState([
    { date: '2025-06-01', doctor: 'Dr. Wanjiru (Cardiology)' },
    { date: '2025-06-15', doctor: 'Dr. Ouma (Dermatology)' },
  ]);


  const [payments, setPayments] = React.useState([
    { id: 1, date: '2025-04-01', amount: 20000, status: 'Paid' },
    { id: 2, date: '2025-03-15', amount: 7500, status: 'Paid' },
    { id: 3, date: '2024-02-28', amount: 38000, status: 'Pending' },
  ]);

  const [paymentFilter, setPaymentFilter] = React.useState('All');
  const [paymentSearch, setPaymentSearch] = React.useState('');

  const [medications, setMedications] = useState([]);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    route: '',
    date: '',
    time: ''
  });

  const [lastAdded, setLastAdded] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [prescriptions, setPrescriptions] = useState([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    duration: '',
    notes: ''
  });






  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Patient Portal</h1>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'Dashboard' && (
          <div className="dashboard-content">
            <div className="card">
              <h3 className="card-title">Upcoming Appointments</h3>
              <ul className="card-list">
                {appointments.map((appt, index) => (
                  <li key={index}>
                    <strong>Date:</strong> {appt.date} — <strong>Doctor:</strong> {appt.doctor}
                  </li>
                ))}
              </ul>

            </div>

            <div className="card">
              <h3 className="card-title">Recent Lab Results</h3>
              <ul className="card-list">
                <li>
                  <strong>Test:</strong> Complete Blood Count — <strong>Result:</strong> Normal — <strong>Date:</strong> 2025-05-10
                </li>
                <li>
                  <strong>Test:</strong> COVID-19 PCR — <strong>Result:</strong> Negative — <strong>Date:</strong> 2025-05-05
                </li>
              </ul>
            </div>
          </div>
        )}


        {activeTab === 'Profile' && (
          <div className="profile-container">
            <h2 className="section-title">Personal Profile</h2>

            <div className="profile-grid">
              <div>
                <label className="profile-label">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.fullName}</p>
                )}
              </div>

              <div>
                <label className="profile-label">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.dob}
                    onChange={(e) =>
                      setProfile({ ...profile, dob: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.dob}</p>
                )}
              </div>


              <div>
                <label className="profile-label">Gender</label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile({ ...profile, gender: e.target.value })
                    }
                    className="profile-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="profile-value">{profile.gender}</p>
                )}
              </div>


              <div>
                <label className="profile-label">Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="profile-label">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="profile-label">NHIF Status</label>
                <span className="nhif-status">{profile.nhifStatus}</span>
              </div>
            </div>

            <div className="edit-button">
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        )}


        {activeTab === 'Messages' && (
          <div>
            <h2 className="section-title">Secure Messages</h2>
            <p>Chat feature coming soon...</p>
          </div>
        )}

        {activeTab === 'Appointments' && (
          <div className="appointments-section">
            <h2 className="section-title">Book or Reschedule Appointment</h2>

            {showAppointmentForm ? (
              <form
                className="appointment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setAppointments([...appointments, newAppointment]);
                  setShowAppointmentForm(false);
                  setNewAppointment({ date: '', doctor: '' });
                  alert('Appointment successfully updated.');
                }}
              >
                <label>
                  Appointment Date:
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  Doctor:
                  <select
                    value={newAppointment.doctor}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, doctor: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Mwangi">Dr. Mwangi</option>
                    <option value="Dr. Achieng">Dr. Achieng</option>
                    <option value="Dr. Kamau">Dr. Kamau</option>
                    <option value="Dr. Otieno">Dr. Otieno</option>
                  </select>
                </label>

                <button type="submit">Confirm Appointment</button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                className="add-appointment-button"
                onClick={() => setShowAppointmentForm(true)}
              >
                Add Appointment
              </button>
            )}
          </div>
        )}


        {activeTab === 'Payments' && (
          <div className="payments-section">
            <div className="payments-header">
              <h2 className="section-title">Payment History</h2>
            </div>

            <div className="payments-controls">
              <div className="payments-summary">
                <p>Total Paid: <strong>Ksh {payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</strong></p>
                <p>Total Pending: <strong>Ksh {payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</strong></p>
              </div>

              <div className="payments-filter-group">
                <label htmlFor="filterPayments">Filter by Status:</label>
                <select
                  id="filterPayments"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>

                <input
                  type="text"
                  className="payment-search"
                  placeholder="Search by date or amount"
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                />
              </div>
            </div>

            <ul className="payments-list">
              {payments
                .filter(payment => {
                  const matchesFilter = paymentFilter === 'All' || payment.status === paymentFilter;
                  const matchesSearch = payment.date.includes(paymentSearch) || payment.amount.toString().includes(paymentSearch);
                  return matchesFilter && matchesSearch;
                })
                .map((payment, index) => (
                  <li key={index} className={`payment-item ${payment.status.toLowerCase()}`}>
                    <div className="payment-details">
                      <p><strong>Date:</strong> {payment.date}</p>
                      <p><strong>Amount:</strong> Ksh {payment.amount.toLocaleString()}</p>
                    </div>
                    <span className={`status-badge ${payment.status.toLowerCase()}`}>{payment.status}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}


        {activeTab === 'Medications' && (
          <div className="medications-section">
            <h2 className="section-title">Drugs Administered</h2>

            <table className="medications-table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paracetamol</td>
                  <td>500mg twice daily</td>
                  <td>2025-05-25</td>
                  <td>08:00 AM</td>
                </tr>
                <tr>
                  <td>Amoxicillin</td>
                  <td>250mg once daily</td>
                  <td>2025-05-26</td>
                  <td>12:00 PM</td>
                </tr>
                <tr>
                  <td>Ibuprofen</td>
                  <td>200mg once daily</td>
                  <td>2025-05-27</td>
                  <td>7:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}


{activeTab === 'Prescriptions' && (
  <div className="prescriptions-section">
    <h2 className="section-title">Prescriptions & Treatment Plans</h2>

    <table className="prescriptions-table">
      <thead>
        <tr>
          <th>Prescription</th>
          <th>Dosage</th>
          <th>Frequency</th>
          <th>Duration</th>
          <th>Plan Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ciprofloxacin</td>
          <td>500mg</td>
          <td>Twice Daily</td>
          <td>7 Days</td>
          <td>Continue for 3 more days if symptoms persist</td>
        </tr>
        <tr>
          <td>Loratadine</td>
          <td>10mg</td>
          <td>Once Daily</td>
          <td>5 Days</td>
          <td>For allergic rhinitis</td>
        </tr>
        <tr>
          <td>Metformin</td>
          <td>500mg</td>
          <td>Twice Daily</td>
          <td>30 Days</td>
          <td>Monitor blood sugar levels regularly</td>
        </tr>
      </tbody>
    </table>
  </div>
)}


        


      </div>
    </div>
  );
}
