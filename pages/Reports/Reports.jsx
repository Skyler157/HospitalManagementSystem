import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from "recharts";

const Reports = () => {
  const [view, setView] = useState("Reports"); // New view state
  const [activeTab, setActiveTab] = useState("MOH 731(HIV)");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [department, setDepartment] = useState("");
  const [condition, setCondition] = useState("");
  const [reportData, setReportData] = useState(null);

  const tabs = ["MOH 731(HIV)", "MOH 405(outpatient)", "Financial"];

  useEffect(() => {
    if (dateFrom && dateTo) {
      const fakeData = {
        "MOH 731(HIV)": {
          totalPatients: 112,
          hivPositive: 42,
          onART: 37,
          newEnrollments: 6,
        },
        "MOH 405(outpatient)": {
          visits: 265,
          malariaCases: 52,
          respiratoryInfections: 41,
        },
        Financial: {
          totalRevenue: 520000,
          insuranceClaims: 180000,
          cashPayments: 340000,
        },
      };
      setReportData(fakeData[activeTab]);
    } else {
      setReportData(null);
    }
  }, [activeTab, dateFrom, dateTo, department, condition]);

  const handleExport = (format) => {
    alert(`Simulating export of ${activeTab} report as ${format}`);
  };

  const renderReport = () => {
    if (!reportData) {
      return <p className="text-gray-500">Select filters to view report data.</p>;
    }

    switch (activeTab) {
      case "MOH 731(HIV)":
        return (
          <div className="space-y-2">
            <p><strong>Total Patients:</strong> {reportData.totalPatients}</p>
            <p><strong>HIV Positive:</strong> {reportData.hivPositive}</p>
            <p><strong>On ARV:</strong> {reportData.onART}</p>
            <p><strong>New Enrollments:</strong> {reportData.newEnrollments}</p>
          </div>
        );
      case "MOH 405(outpatient)":
        return (
          <div className="space-y-2">
            <p><strong>Visits:</strong> {reportData.visits}</p>
            <p><strong>Malaria Cases:</strong> {reportData.malariaCases}</p>
            <p><strong>Respiratory Infections:</strong> {reportData.respiratoryInfections}</p>
          </div>
        );
      case "Financial":
        return (
          <div className="space-y-2">
            <p><strong>Total Revenue:</strong> KES {reportData.totalRevenue}</p>
            <p><strong>Insurance Claims:</strong> KES {reportData.insuranceClaims}</p>
            <p><strong>Cash Payments:</strong> KES {reportData.cashPayments}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderVisualCharts = () => {
    if (!reportData) return <p className="text-gray-500">Select filters to visualize data.</p>;

    if (activeTab === "MOH 731(HIV)") {
      const data = [
        { label: "Total", value: reportData.totalPatients },
        { label: "HIV+", value: reportData.hivPositive },
        { label: "On ARV", value: reportData.onART },
        { label: "New", value: reportData.newEnrollments },
      ];
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (activeTab === "MOH 405(outpatient)") {
      const data = [
        { name: "Visits", value: reportData.visits },
        { name: "Malaria", value: reportData.malariaCases },
        { name: "Resp. Inf.", value: reportData.respiratoryInfections },
      ];
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (activeTab === "Financial") {
      const data = [
        { name: "Revenue", value: reportData.totalRevenue },
        { name: "Claims", value: reportData.insuranceClaims },
        { name: "Cash", value: reportData.cashPayments },
      ];
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#9333ea" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="p-6">
      {/* Top Tabs */}
      <div className="flex gap-4 mb-6">
        {["Reports", "Visual Charts"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded font-semibold ${
              view === v ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4">{view}</h1>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-t ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters only shown in Reports view */}
      {view === "Reports" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-1">Date From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Department --</option>
              <option value="Outpatient">Outpatient</option>
              <option value="Maternity">Maternity</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="HIV Clinic">HIV Clinic</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Condition</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Malaria, HIV"
            />
          </div>
        </div>
      )}

      {/* Report or Chart Display */}
      <div className="bg-white p-4 border rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {view === "Reports" ? "Report Summary" : "Chart Visualization"}
        </h2>
        {view === "Reports" ? renderReport() : renderVisualCharts()}
      </div>

      {/* Export Buttons */}
      {view === "Reports" && (
        <div className="flex gap-3">
          <button
            onClick={() => handleExport("PDF")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Export PDF
          </button>
          <button
            onClick={() => handleExport("Excel")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport("KHIS")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500"
          >
            Export KHIS
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;
