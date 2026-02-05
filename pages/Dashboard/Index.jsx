import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUserDoctor } from "react-icons/fa6";
import { CiUser, CiStethoscope } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";

const Index = () => {
  const [dashboardData] = useState({
    doctorsCount: 30,
    patientsCount: 172,
    admittedCount: 72,
    pendingCount: 68,
    patientTotals: [
      { month: "Jan", total: 400 },
      { month: "Feb", total: 300 },
      { month: "Mar", total: 500 },
      { month: "Apr", total: 700 },
      { month: "May", total: 600 },
      { month: "Jun", total: 800 },
    ],
    patientsIn: [
      { day: "Mon", count: 40 },
      { day: "Tue", count: 30 },
      { day: "Wed", count: 50 },
      { day: "Thu", count: 70 },
      { day: "Fri", count: 60 },
      { day: "Sat", count: 80 },
      { day: "Sun", count: 20 },
    ],
  });

  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center px-10">
        <div className="flex space-x-4 font-bold w-full">
          <div className="flex bg-blue-100 w-full text-blue-800 px-4 py-2 rounded shadow justify-between hover:shadow-lg">
            <FaUserDoctor size={30} />
            <span className="text-right w-full">
              Doctors <br />
              {dashboardData.doctorsCount}
            </span>
          </div>
          <div className="w-full flex bg-green-100 text-green-800 px-4 py-2 rounded shadow justify-between hover:shadow-lg">
            <CiUser size={30} />
            <span className="text-right w-full">
              Patients
              <br /> {dashboardData.patientsCount}
            </span>
          </div>
          <div className="w-full flex bg-gray-100 text-gray-800 px-4 py-2 rounded shadow justify-between hover:shadow-lg">
            <CiStethoscope size={30} />
            <span className="text-right w-full">
              Admitted <br />
              {dashboardData.admittedCount}
            </span>
          </div>
          <div className="w-full flex bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow justify-between hover:shadow-lg">
            <BsHeartPulse size={30} />
            <span className="text-right w-full">
              Pending
              <br />
              {dashboardData.pendingCount}
            </span>
          </div>
        </div>
      </header>

      {/* Graph Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Patient Total</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={dashboardData.patientTotals}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                fill="#bfdbfe"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Patients In</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={dashboardData.patientsIn}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Appointments & Doctors */}
      <section className="grid grid-cols-1 md:grid-cols-2 px-10 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Upcoming Appointments</h2>
          <ul className="space-y-2 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b pb-1"
              >
                <span>Patient {i + 1} - Dr. Ayuago</span>
                <button className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-xs">
                  Take Up
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Doctors</h2>
          <ul className="space-y-2 text-sm">
            {[
              "John Kitili",
              "Jane Smith",
              "Richard Marx",
              "Dr. Benjamin Mkapa",
            ].map((doc, i) => (
              <li key={i} className="flex justify-between border-b pb-1">
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* New Patients & Hospital Management */}
      <section className="grid grid-cols-1 px-10 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">New Patients</h2>
          <ul className="text-sm space-y-2">
            {["Jane", "Robert", "Vivian", "Martin"].map((name, i) => (
              <li key={i} className="flex justify-between border-b pb-1">
                <span>{name}</span>
                <span className="text-xs text-gray-500">Fever</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Hospital Management</h2>
          <div className="space-y-2">
            {[
              { label: "OPD Patient", width: "w-4/5" },
              { label: "New Patient", width: "w-3/5" },
              { label: "Lab Test", width: "w-3/4" },
              { label: "Treatment", width: "w-5/6" },
              { label: "Diseases", width: "w-2/3" },
            ].map((item, i) => (
              <div key={i}>
                <span className="text-xs">{item.label}</span>
                <div
                  className={`bg-blue-500 h-3 rounded-r-full ${item.width}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
