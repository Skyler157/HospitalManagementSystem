import { useState } from "react";

// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
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



// Disease Report Component
function DiseaseReport() {
  const data = [
    { name: "URI", prev: 274, current: 286 },
    { name: "Malaria", prev: 187, current: 204 },
    { name: "Diarrhea", prev: 165, current: 187 },
    { name: "HTN", prev: 142, current: 156 },
    { name: "Diabetes", prev: 138, current: 142 },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Disease Trend Report</h2>
        <div className="text-sm text-gray-600">
          Reporting Period: April 16 - May 15, 2025
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Common Diagnoses Trend</h3>
          <div className="border rounded-md p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prev" fill="#8884d8" name="Previous" />
                <Bar dataKey="current" fill="#82ca9d" name="Current" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Malaria Cases by Age Group</h3>
          <div className="border rounded-md p-4 h-64">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">0-5 years</span>
                  <span className="text-sm font-medium">68 (33.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "33.3%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">6-14 years</span>
                  <span className="text-sm font-medium">42 (20.6%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "20.6%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">15-24 years</span>
                  <span className="text-sm font-medium">30 (14.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "14.7%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">25-45 years</span>
                  <span className="text-sm font-medium">45 (22.1%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "22.1%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">46+ years</span>
                  <span className="text-sm font-medium">19 (9.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "9.3%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Disease Distribution by Location</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Top Diagnosis
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cases
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Kibera
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Malaria
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">87</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Westlands
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Hypertension
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">58</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Eastleigh
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Diarrhea
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">52</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Karen</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Diabetes
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">45</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Githurai
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">URI</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Notifiable Diseases</h3>
          <div className="border rounded-md p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Tuberculosis</div>
                  <div className="text-xs text-gray-600">12 new cases</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                  Report to MOH
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Typhoid</div>
                  <div className="text-xs text-gray-600">5 new cases</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                  Report to MOH
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Cholera</div>
                  <div className="text-xs text-gray-600">0 new cases</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                  No cases
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Measles</div>
                  <div className="text-xs text-gray-600">2 new cases</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                  Report to MOH
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Polio</div>
                  <div className="text-xs text-gray-600">0 new cases</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                  No cases
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Disease Outbreak Monitoring</h3>
        <div className="border rounded-md p-4">
          <div className="flex justify-between mb-3">
            <div>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                Alert
              </span>
              <span className="ml-2 font-medium">
                Diarrheal Disease Increase
              </span>
            </div>
            <span className="text-sm text-gray-600">
              Last 7 days: +32% cases
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            187 cases reported in the last 30 days, with significant increase in
            Eastleigh area. Potential outbreak investigation recommended.
          </p>
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              Generate Alert Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DiseaseReport;