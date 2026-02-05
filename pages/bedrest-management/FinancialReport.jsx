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


// Financial Report Component
function FinancialReport() {
  const data = [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 3000, expenses: 1398 },
    { month: "Mar", revenue: 2000, expenses: 9800 },
    { month: "Apr", revenue: 2780, expenses: 3908 },
    { month: "May", revenue: 1890, expenses: 4800 },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Financial Report</h2>
        <div className="text-sm text-gray-600">
          Reporting Period: April 16 - May 15, 2025
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-green-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-xl font-semibold">KSh 2.4M</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Expenses</div>
            <div className="text-xl font-semibold">KSh 1.8M</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Net Profit</div>
            <div className="text-xl font-semibold">KSh 600K</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-yellow-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Profit Margin</div>
            <div className="text-xl font-semibold">25%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Revenue by Department</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Outpatient
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    KSh 850K
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">35.4%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Inpatient
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    KSh 620K
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">25.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Laboratory
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    KSh 450K
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">18.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Pharmacy
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    KSh 360K
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">15.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    Radiology
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    KSh 120K
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">5.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Expense Breakdown</h3>
          <div className="border rounded-md p-4 h-64">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Salaries & Wages</span>
                  <span className="text-sm font-medium">KSh 950K (52.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "52.7%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Medical Supplies</span>
                  <span className="text-sm font-medium">KSh 420K (23.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "23.3%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Utilities</span>
                  <span className="text-sm font-medium">KSh 180K (10.0%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "10.0%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Maintenance</span>
                  <span className="text-sm font-medium">KSh 150K (8.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "8.3%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Other Expenses</span>
                  <span className="text-sm font-medium">KSh 100K (5.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "5.7%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Revenue vs. Expenses (Monthly)</h3>
        <div className="border rounded-md p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
              <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FinancialReport;