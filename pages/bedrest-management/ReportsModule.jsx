
import DiseaseReport  from "./DiseaseReport";// Reports Module Component
import FinancialReport from "./FinancialReport";
import HIVReport from "./HIVReport";
import OutpatientReport from "./OutpatientReport";
import { Calendar, Download } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

function ReportsModule() {
  const [selectedReport, setSelectedReport] = useState("moh731");
  const [dateRange, setDateRange] = useState("month");

  return (
    <div className="h-full">
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-2 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Report Generator</h2>
            <div className="flex space-x-2">
              <select
                className="border rounded-md px-3 py-2"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="moh731">MOH 731 (HIV)</option>
                <option value="moh405">MOH 405 (Outpatient)</option>
                <option value="revenue">Financial Report</option>
                <option value="disease">Disease Trends</option>
                <option value="custom">Custom Report</option>
              </select>

              <select
                className="border rounded-md px-3 py-2"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
                Generate Report
              </button>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              PDF
            </button>
            <button className="flex items-center border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              Excel
            </button>
            <button className="flex items-center border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              KHIS Format
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow p-4 h-4/5 overflow-auto">
        {selectedReport === "moh731" && <HIVReport />}
        {selectedReport === "moh405" && <OutpatientReport />}
        {selectedReport === "revenue" && <FinancialReport />}
        {selectedReport === "disease" && <DiseaseReport />}
      </div>

      {/* Schedule Reports */}
      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Scheduled Reports</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            + Schedule New Report
          </button>
        </div>
        <div className="mt-2 text-sm">
          <div className="flex justify-between py-2 border-b">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>MOH 731 Report</span>
            </div>
            <div className="text-gray-500">Monthly • Next: 01/06/2025</div>
          </div>
          <div className="flex justify-between py-2 border-b">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>Financial Summary</span>
            </div>
            <div className="text-gray-500">Weekly • Next: 23/05/2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsModule;
