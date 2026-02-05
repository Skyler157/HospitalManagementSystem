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
import { AlertCircle } from "lucide-react";


// Outpatient Report Component
function OutpatientReport() {
  const data = [
    { day: "Apr 16", patients: 54 },
    { day: "Apr 17", patients: 73 },
    { day: "Apr 18", patients: 68 },
    { day: "Apr 19", patients: 91 },
    { day: "Apr 20", patients: 82 },
    { day: "Apr 21", patients: 75 },
    { day: "Apr 22", patients: 66 },
    { day: "Apr 23", patients: 80 },
    { day: "Apr 24", patients: 94 },
    { day: "Apr 25", patients: 72 },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          MOH 405 - Outpatient Summary Report
        </h2>
        <div className="text-sm text-gray-600">
          Reporting Period: April 16 - May 15, 2025
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Patients</div>
            <div className="text-xl font-semibold">1,892</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-green-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">New Patients</div>
            <div className="text-xl font-semibold">347</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-yellow-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Referrals</div>
            <div className="text-xl font-semibold">62</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-purple-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Avg. Wait Time</div>
            <div className="text-xl font-semibold">24 min</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Top 10 Diagnoses</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Upper Respiratory Infection
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">286</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">15.1%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Malaria
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">204</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">10.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Diarrhea
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">187</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">9.9%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Hypertension
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">156</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">8.2%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Diabetes
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">142</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">7.5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Pneumonia
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">98</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">5.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Patient Demographics</h3>
          <div className="border rounded-md p-4 h-64">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-xs w-16">0-5 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">22%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">6-18 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "18%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">18%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">19-35 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">30%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">36-50 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "17%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">17%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">51+ yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "13%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">13%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Gender</h4>
                <div className="flex flex-col items-center justify-center h-32">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">Male (46%)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                    <span className="text-xs">Female (54%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Daily Patient Flow</h3>
        <div className="border rounded-md p-4 h-64">
          <div className="h-64 w-full flex flex-col items-center">
            <BarChart
              width={900}
              height={250}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="" />
            </BarChart>

            <div className="text-center text-xs text-gray-500 mt-2">
              Chart: Number of patients seen per day
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutpatientReport;