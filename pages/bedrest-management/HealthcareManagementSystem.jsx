import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/tabs";
import BedrestManagement from "./BedrestManagement";
import PatientQueueManagement from "./PatientQueueManagement";
import { MessageSquare, Users, BedDouble, Calendar } from "lucide-react";

function HospitalManagementSystem() {
  const [wards, setWards] = useState([
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
  ]);

  // Handle patient assignment to bed
  const handlePatientAssigned = (patient, bed) => {
    // Update bed status
    setWards(prevWards => 
      prevWards.map(ward => {
        if (ward.id === bed.wardId) {
          return {
            ...ward,
            beds: ward.beds.map(b => {
              if (b.id === bed.id) {
                return {
                  ...b,
                  status: "occupied",
                  patient: patient.name,
                  condition: "Stable", // Default or based on patient condition
                  admissionDate: new Date().toLocaleDateString(),
                  doctor: "Dr. Smith", // Default or assigned doctor
                };
              }
              return b;
            }),
          };
        }
        return ward;
      })
    );
  };

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Hospital Management System</h1>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4 mr-1" />
                Notifications (3)
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Dashboard
              </button>
            </div>
          </div>
        </header>

        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="bg-white rounded-lg shadow mb-4 p-1 w-full flex">
            <TabsTrigger value="queue" className="flex-1 py-2">
              <Users className="h-4 w-4 mr-2" /> Patient Queue
            </TabsTrigger>
            <TabsTrigger value="beds" className="flex-1 py-2">
              <BedDouble className="h-4 w-4 mr-2" /> Bed Management
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex-1 py-2">
              <Calendar className="h-4 w-4 mr-2" /> Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="mt-0">
            <PatientQueueManagement 
              wards={wards} 
              onPatientAssigned={handlePatientAssigned} 
            />
          </TabsContent>

          <TabsContent value="beds" className="mt-0">
            <BedrestManagement wards={wards} />
          </TabsContent>

          <TabsContent value="appointments" className="mt-0 bg-white rounded-lg shadow p-4">
            <div className="text-center py-12">
              <Calendar className="mx-auto mb-3 text-gray-400 h-12 w-12" />
              <h3 className="text-lg font-medium text-gray-600">
                Appointment Module
              </h3>
              <p className="text-gray-500">
                The appointment management module is coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default HospitalManagementSystem;