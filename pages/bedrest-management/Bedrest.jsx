import { useState } from "react";
import {
  Calendar,
  BedDouble,
  FileText,
  Users,
  Clipboard,
  AlertCircle,
  Download,
  ChevronDown,
  Check,
  Clock,
  X,
} from "lucide-react";

import ReportsModule from "./ReportsModule";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Main App Component
export default function HealthcareManagementSystem() {
  const [activeTab, setActiveTab] = useState("reports");

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Healthcare Management System</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md text-sm">
              <Users className="inline mr-1 h-4 w-4" />
              Admin
            </button>
            <span>Dr. Sarah Johnson</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="flex space-x-1 px-6">
          <button
            className={`py-4 px-4 font-medium ${
              activeTab === "bedrest"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("bedrest")}
          >
            <BedDouble className="inline mr-2 h-4 w-4" />
            Bedrest Management
          </button>
          <button
            className={`py-4 px-4 font-medium ${
              activeTab === "reports"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <FileText className="inline mr-2 h-4 w-4" />
            Reports
          </button>
          <button
            className={`py-4 px-4 font-medium ${
              activeTab === "test"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("test")}
          >
            <FileText className="inline mr-2 h-4 w-4" />
            test
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {/* <main className="flex-1 overflow-auto p-6">
        {activeTab === "bedrest" ? <BedrestManagement /> : <ReportsModule />}
      </main> */}

      <main className="flex-1 overflow-auto p-6">
        {activeTab === "bedrest" ? (
          <BedrestManagement />
        ) : activeTab === "reports" ? (
          <ReportsModule />
        ) : (
          <TestComponent />
        )}
      </main>
    </div>
  );
}

// Bedrest Management Component
function BedrestManagement() {
  const [selectedBed, setSelectedBed] = useState(null);
  const [showDischargeForm, setShowDischargeForm] = useState(false);

  const wards = [
    {
      id: 1,
      name: "General Ward",
      beds: [
        {
          id: 101,
          status: "occupied",
          patient: "John Doe",
          condition: "Stable",
          admissionDate: "12/05/2025",
          doctor: "Dr. Smith",
        },
        { id: 102, status: "free" },
        {
          id: 103,
          status: "occupied",
          patient: "Jane Smith",
          condition: "Improving",
          admissionDate: "14/05/2025",
          doctor: "Dr. Johnson",
        },
        {
          id: 104,
          status: "occupied",
          patient: "Robert Brown",
          condition: "Critical",
          admissionDate: "10/05/2025",
          doctor: "Dr. Smith",
        },
        { id: 105, status: "free" },
        {
          id: 106,
          status: "occupied",
          patient: "Mary Williams",
          condition: "Stable",
          admissionDate: "09/05/2025",
          doctor: "Dr. Williams",
        },
      ],
    },
    {
      id: 2,
      name: "Pediatric Ward",
      beds: [
        { id: 201, status: "free" },
        {
          id: 202,
          status: "occupied",
          patient: "Alice Johnson",
          condition: "Stable",
          admissionDate: "11/05/2025",
          doctor: "Dr. Garcia",
        },
        {
          id: 203,
          status: "occupied",
          patient: "Tommy Lee",
          condition: "Improving",
          admissionDate: "13/05/2025",
          doctor: "Dr. Chen",
        },
        { id: 204, status: "free" },
      ],
    },
    {
      id: 3,
      name: "ICU",
      beds: [
        {
          id: 301,
          status: "occupied",
          patient: "Samuel Green",
          condition: "Critical",
          admissionDate: "08/05/2025",
          doctor: "Dr. Wilson",
        },
        {
          id: 302,
          status: "occupied",
          patient: "Elizabeth Taylor",
          condition: "Critical",
          admissionDate: "07/05/2025",
          doctor: "Dr. Martinez",
        },
        { id: 303, status: "free" },
      ],
    },
  ];

  const handleBedClick = (bed) => {
    setSelectedBed(bed);
    setShowDischargeForm(false);
  };

  return (
    <div className="flex h-full space-x-4">
      {/* Left panel - Bed allocation map */}
      <div className="w-2/3 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Bed Allocation Map</h2>
          <div className="flex items-center text-sm">
            <span className="flex items-center mr-4">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>{" "}
              Available
            </span>
            <span className="flex items-center mr-4">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>{" "}
              Occupied
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>{" "}
              Reserved
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {wards.map((ward) => (
            <div key={ward.id} className="border rounded-md p-4">
              <h3 className="font-medium mb-3">{ward.name}</h3>
              <div className="grid grid-cols-6 gap-3">
                {ward.beds.map((bed) => (
                  <div
                    key={bed.id}
                    className={`
                      border p-2 rounded-md cursor-pointer flex flex-col items-center
                      ${
                        bed.status === "free"
                          ? "bg-green-100 border-green-300"
                          : "bg-red-100 border-red-300"
                      }
                      ${
                        selectedBed?.id === bed.id ? "ring-2 ring-blue-500" : ""
                      }
                    `}
                    onClick={() => handleBedClick(bed)}
                  >
                    <BedDouble
                      className={`mb-1 ${
                        bed.status === "free"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                    <span className="text-xs font-medium">Bed {bed.id}</span>
                    {bed.status === "occupied" && (
                      <span className="text-xs truncate w-full text-center">
                        {bed.patient}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <span className="text-sm font-medium mr-2">Total Beds: 13</span>
            <span className="text-sm font-medium mr-2">Occupied: 8</span>
            <span className="text-sm font-medium">Available: 5</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            <AlertCircle className="inline mr-1 h-4 w-4" />
            Bed Alerts (2)
          </button>
        </div>
      </div>

      {/* Right panel - Patient details */}
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-y-auto">
        {selectedBed ? (
          <>
            {!showDischargeForm ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Bed {selectedBed.id} Details
                  </h2>
                  {selectedBed.status === "occupied" && (
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() => setShowDischargeForm(true)}
                      >
                        Discharge
                      </button>
                    </div>
                  )}
                </div>

                {selectedBed.status === "free" ? (
                  <div className="text-center py-8">
                    <BedDouble className="mx-auto mb-2 text-green-600 h-12 w-12" />
                    <h3 className="text-lg font-medium">
                      Bed {selectedBed.id} is available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This bed is ready for new patient allocation
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                      Assign Patient
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="border-b pb-3 mb-3">
                      <h3 className="font-medium">{selectedBed.patient}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Admission Date: {selectedBed.admissionDate}</div>
                        <div>Doctor: {selectedBed.doctor}</div>
                        <div className="mt-1">
                          Condition:
                          <span
                            className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium
                            ${
                              selectedBed.condition === "Critical"
                                ? "bg-red-100 text-red-800"
                                : selectedBed.condition === "Stable"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {selectedBed.condition}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ward Round Notes */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Ward Round Notes</h4>
                      <textarea
                        className="w-full border rounded-md p-2 text-sm"
                        rows="4"
                        placeholder="Enter daily patient updates here..."
                        defaultValue="Patient vitals stable. Continuing current treatment plan. Pain level reduced from yesterday."
                      ></textarea>
                      <div className="flex justify-end mt-1">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                          Save Notes
                        </button>
                      </div>
                    </div>

                    {/* Patient Timeline */}
                    <div>
                      <h4 className="font-medium mb-2">Patient Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex">
                          <div className="mr-2 mt-0.5">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-xs text-gray-500">
                              15 May, 9:30 AM
                            </div>
                            <div>
                              Medication administered - Amoxicillin 500mg
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="mr-2 mt-0.5">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-xs text-gray-500">
                              14 May, 2:15 PM
                            </div>
                            <div>Lab results received - Blood count normal</div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="mr-2 mt-0.5">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-xs text-gray-500">
                              14 May, 8:00 AM
                            </div>
                            <div>Ward round - Dr. Smith noted improvement</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <DischargeForm
                bed={selectedBed}
                onCancel={() => setShowDischargeForm(false)}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto mb-3 text-gray-400 h-12 w-12" />
            <h3 className="text-lg font-medium text-gray-600">
              No Bed Selected
            </h3>
            <p className="text-gray-500">
              Select a bed from the map to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Discharge Form Component
function DischargeForm({ bed, onCancel }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Discharge Summary</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-3">
        <div className="font-medium">{bed.patient}</div>
        <div className="text-sm text-gray-600">
          Bed {bed.id} • Admitted on {bed.admissionDate}
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Diagnosis</label>
          <textarea
            className="w-full border rounded-md p-2 text-sm"
            rows="2"
            placeholder="Final diagnosis"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Medications</label>
          <div className="border rounded-md p-2 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Amoxicillin 500mg</div>
                <div className="text-xs text-gray-500">
                  1 tab TID for 7 days
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Paracetamol 500mg</div>
                <div className="text-xs text-gray-500">
                  1 tab QID PRN for pain
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              + Add Medication
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Follow-up Plan
          </label>
          <textarea
            className="w-full border rounded-md p-2 text-sm"
            rows="2"
            placeholder="Follow-up instructions"
          ></textarea>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Discharge Checklist</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">
                Patient educated on medication regimen
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Follow-up appointment scheduled</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Prescriptions provided</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Insurance documentation completed</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Complete Discharge
          </button>
        </div>
      </form>
    </div>
  );
}









