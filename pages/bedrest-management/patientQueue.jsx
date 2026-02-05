import React, { useState, useEffect } from "react";
import { Clock, UserCheck, BedDouble, AlertCircle, Search, Filter, ChevronRight, Calendar } from "lucide-react";

function PatientQueueManagement({ wards, onPatientAssigned }) {
  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "Thomas Wilson",
      age: 45,
      gender: "Male",
      priority: "High",
      status: "Waiting", // Waiting, Assigned, Cancelled
      timeInQueue: "2h 15m",
      checkInTime: "9:30 AM",
      condition: "Chest pain, shortness of breath",
      type: "Emergency",
      preferredWard: "General Ward",
      assignedBed: null
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      priority: "Medium",
      status: "Waiting",
      timeInQueue: "1h 45m",
      checkInTime: "10:00 AM",
      condition: "Abdominal pain, nausea",
      type: "Emergency",
      preferredWard: "General Ward",
      assignedBed: null
    },
    {
      id: "P003",
      name: "Emily Davis",
      age: 7,
      gender: "Female",
      priority: "High",
      status: "Waiting",
      timeInQueue: "1h 30m",
      checkInTime: "10:15 AM",
      condition: "High fever, rash",
      type: "Emergency",
      preferredWard: "Pediatric Ward",
      assignedBed: null
    },
    {
      id: "P004",
      name: "Michael Brown",
      age: 62,
      gender: "Male",
      priority: "Low",
      status: "Waiting",
      timeInQueue: "1h 10m",
      checkInTime: "10:35 AM",
      condition: "Scheduled follow-up after surgery",
      type: "Outpatient",
      preferredWard: "General Ward",
      assignedBed: null
    },
    {
      id: "P005",
      name: "Jessica Martinez",
      age: 28,
      gender: "Female",
      priority: "Medium",
      status: "Waiting",
      timeInQueue: "0h 45m",
      checkInTime: "11:00 AM",
      condition: "Severe migraine, light sensitivity",
      type: "Emergency",
      preferredWard: null,
      assignedBed: null
    },
  ]);

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Waiting");
  const [showAssignBedModal, setShowAssignBedModal] = useState(false);
  const [showConvertOutpatientModal, setShowConvertOutpatientModal] = useState(false);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);

  // Filter and search patients
  useEffect(() => {
    let result = patients;
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(patient => patient.status === filterStatus);
    }
    
    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(patient => 
        patient.name.toLowerCase().includes(lowerSearchTerm) ||
        patient.id.toLowerCase().includes(lowerSearchTerm) ||
        (patient.condition && patient.condition.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    setFilteredPatients(result);
  }, [patients, searchTerm, filterStatus]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleShowAssignBed = (patient) => {
    setSelectedPatient(patient);
    // Find all available beds from wards
    const beds = [];
    
    wards.forEach(ward => {
      // If patient has preferred ward, only show beds from that ward
      if (!patient.preferredWard || ward.name === patient.preferredWard) {
        ward.beds.forEach(bed => {
          if (bed.status === "free") {
            beds.push({
              ...bed,
              wardName: ward.name,
              wardId: ward.id
            });
          }
        });
      }
    });
    
    setAvailableBeds(beds);
    setShowAssignBedModal(true);
  };
  
  const handleAssignBed = () => {
    if (!selectedBed || !selectedPatient) return;
    
    // Update patient status
    setPatients(prevPatients => 
      prevPatients.map(p => 
        p.id === selectedPatient.id 
          ? { ...p, status: "Assigned", assignedBed: selectedBed.id } 
          : p
      )
    );
    
    // Notify parent component of bed assignment
    if (onPatientAssigned) {
      onPatientAssigned(selectedPatient, selectedBed);
    }
    
    setShowAssignBedModal(false);
    setSelectedBed(null);
  };

  const handleShowConvertOutpatient = (patient) => {
    setSelectedPatient(patient);
    setShowConvertOutpatientModal(true);
  };
  
  const handleConvertToInpatient = () => {
    // Update patient type from Outpatient to Inpatient
    setPatients(prevPatients => 
      prevPatients.map(p => 
        p.id === selectedPatient.id 
          ? { ...p, type: "Inpatient" } 
          : p
      )
    );
    
    // Close modal and show assign bed modal
    setShowConvertOutpatientModal(false);
    handleShowAssignBed(selectedPatient);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Patient Queue Management</h2>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <select
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Waiting">Waiting</option>
            <option value="Assigned">Assigned</option>
            <option value="Cancelled">Cancelled</option>
            <option value="">All</option>
          </select>
        </div>
      </div>
      
      {/* Queue List */}
      <div className="divide-y overflow-auto max-h-96">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                selectedPatient?.id === patient.id ? "bg-blue-50" : ""
              }`}
              onClick={() => handlePatientSelect(patient)}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center
                  ${patient.priority === "High" ? "bg-red-100 text-red-800" : 
                    patient.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-green-100 text-green-800"}
                `}>
                  <span className="text-sm font-semibold">
                    {patient.priority.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <div className="text-sm text-gray-600">
                    {patient.id} • {patient.age} yrs • {patient.gender}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className={`
                      px-2 py-0.5 rounded-full mr-1
                      ${patient.type === "Emergency" ? "bg-red-100 text-red-800" : 
                        patient.type === "Outpatient" ? "bg-blue-100 text-blue-800" : 
                        "bg-purple-100 text-purple-800"}
                    `}>
                      {patient.type}
                    </span>
                    {patient.condition}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{patient.timeInQueue}</span>
                </div>
                <div className="mt-2">
                  {patient.status === "Waiting" && (
                    <>
                      {patient.type === "Outpatient" ? (
                        <button 
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowConvertOutpatient(patient);
                          }}
                        >
                          Convert to Inpatient
                        </button>
                      ) : (
                        <button 
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowAssignBed(patient);
                          }}
                        >
                          Assign Bed
                        </button>
                      )}
                    </>
                  )}
                  {patient.status === "Assigned" && (
                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                      Bed #{patient.assignedBed}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No patients match your search criteria
          </div>
        )}
      </div>
      
      {/* Summary Section */}
      <div className="p-4 border-t flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">{patients.filter(p => p.status === "Waiting").length}</span> patients waiting •
          <span className="font-medium ml-2">{patients.filter(p => p.priority === "High" && p.status === "Waiting").length}</span> high priority •
          <span className="font-medium ml-2">{
            patients.filter(p => p.type === "Emergency" && p.status === "Waiting").length
          }</span> emergency
        </div>
        <div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            View All Queues <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
      
      {/* Patient Details Panel (when selected) */}
      {selectedPatient && (
        <div className="border-t p-4">
          <h3 className="font-medium mb-2">Patient Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Patient ID</div>
              <div>{selectedPatient.id}</div>
            </div>
            <div>
              <div className="text-gray-600">Check-in Time</div>
              <div>{selectedPatient.checkInTime}</div>
            </div>
            <div>
              <div className="text-gray-600">Condition</div>
              <div>{selectedPatient.condition}</div>
            </div>
            <div>
              <div className="text-gray-600">Preferred Ward</div>
              <div>{selectedPatient.preferredWard || "No preference"}</div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            {selectedPatient.type === "Outpatient" && selectedPatient.status === "Waiting" && (
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleShowConvertOutpatient(selectedPatient)}
              >
                Convert to Inpatient
              </button>
            )}
            {(selectedPatient.type === "Inpatient" || selectedPatient.type === "Emergency") && 
             selectedPatient.status === "Waiting" && (
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleShowAssignBed(selectedPatient)}
              >
                Assign Bed
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Assign Bed Modal */}
      {showAssignBedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
            <h3 className="text-lg font-semibold mb-4">Assign Bed to {selectedPatient?.name}</h3>
            
            {availableBeds.length > 0 ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select Available Bed</label>
                  <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                    {availableBeds.map((bed) => (
                      <div
                        key={bed.id}
                        className={`
                          border p-2 rounded-md cursor-pointer flex flex-col items-center
                          ${selectedBed?.id === bed.id ? "bg-blue-100 border-blue-500" : "bg-green-100 border-green-300"}
                        `}
                        onClick={() => setSelectedBed(bed)}
                      >
                        <BedDouble className="mb-1 text-green-600" />
                        <span className="text-xs font-medium">Bed {bed.id}</span>
                        <span className="text-xs text-gray-600">{bed.wardName}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Admission Notes</label>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm"
                    rows="3"
                    placeholder="Enter any relevant admission notes..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50 text-sm"
                    onClick={() => setShowAssignBedModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                    onClick={handleAssignBed}
                    disabled={!selectedBed}
                  >
                    Confirm Assignment
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <AlertCircle className="mx-auto mb-2 text-red-500 h-10 w-10" />
                <h4 className="font-medium">No Available Beds</h4>
                <p className="text-sm text-gray-600 mb-4">
                  There are currently no available beds{selectedPatient?.preferredWard ? ` in ${selectedPatient.preferredWard}` : ''}.
                </p>
                <div className="flex justify-center space-x-2">
                  <button
                    className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50 text-sm"
                    onClick={() => setShowAssignBedModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                    onClick={() => {
                      // If patient has a preferred ward, clear it to show all available beds
                      if (selectedPatient?.preferredWard) {
                        setSelectedPatient({...selectedPatient, preferredWard: null});
                        handleShowAssignBed({...selectedPatient, preferredWard: null});
                      }
                    }}
                  >
                    Show All Available Beds
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Convert Outpatient Modal */}
      {showConvertOutpatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
            <h3 className="text-lg font-semibold mb-4">Convert to Inpatient</h3>
            
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                <div className="flex items-start">
                  <div className="mr-3">
                    <UserCheck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedPatient?.name}</h4>
                    <p className="text-sm text-gray-600">
                      This will convert the patient from Outpatient to Inpatient status, 
                      requiring bed assignment and full admission processing.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Reason for Admission</label>
                  <select className="w-full border rounded-md p-2 text-sm">
                    <option>Requires extended monitoring</option>
                    <option>Condition worsened</option>
                    <option>Surgery required</option>
                    <option>Diagnostic procedures</option>
                    <option>Other medical reason</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Expected Length of Stay</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      defaultValue="3"
                      className="w-20 border rounded-md p-2 text-sm"
                    />
                    <select className="border rounded-md p-2 text-sm">
                      <option>Days</option>
                      <option>Weeks</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Admission Notes</label>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm"
                    rows="3"
                    placeholder="Enter any relevant admission notes..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50 text-sm"
                onClick={() => setShowConvertOutpatientModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                onClick={handleConvertToInpatient}
              >
                Convert & Assign Bed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientQueueManagement;