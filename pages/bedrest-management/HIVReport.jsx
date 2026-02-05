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

// HIV Report Component
function HIVReport() {
  const mohData = {
    testing: {
      title: "HIV Testing & Counselling",
      data: [
        { category: "Tested", count: 487 },
        { category: "Positive", count: 42 },
        { category: "Linked to Care", count: 39 },
      ],
    },
    care: {
      title: "HIV Care",
      data: [
        { category: "New Enrollments", count: 39 },
        { category: "Currently in Care", count: 875 },
        { category: "On ART", count: 865 },
        { category: "Viral Load Suppressed", count: 810 },
      ],
    },
    pmtct: {
      title: "PMTCT",
      data: [
        { category: "Pregnant Women Tested", count: 112 },
        { category: "Positive", count: 8 },
        { category: "On ART", count: 8 },
        { category: "Infants Tested", count: 7 },
      ],
    },
  };

  const data = [
    { name: "Apr", tested: 450, positive: 39, enrolled: 37 },
    { name: "May", tested: 487, positive: 42, enrolled: 39 },
    { name: "Jun", tested: 423, positive: 35, enrolled: 33 },
    { name: "Jul", tested: 465, positive: 40, enrolled: 38 },
    { name: "Aug", tested: 478, positive: 45, enrolled: 42 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          MOH 731 - HIV/AIDS Program Report
        </h2>
        <div className="text-sm text-gray-600">
          Reporting Period: April 16 - May 15, 2025
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.values(mohData).map((section, index) => (
          <div key={index} className="border rounded-md p-4">
            <h3 className="font-medium mb-2">{section.title}</h3>
            <div className="space-y-2">
              {section.data.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm">{item.category}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">HIV Testing & Enrollment Trends</h3>
        <div className="h-64 w-full flex flex-col items-center">
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tested" fill="#8884d8" />
            <Bar dataKey="positive" fill="#82ca9d" />
            <Bar dataKey="enrolled" fill="#ffc658" />
          </BarChart>

          <div className="text-center text-xs text-gray-500 mt-2">
            Chart: Monthly HIV testing, positive cases, and enrollment trends
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-2">Facility Performance Indicators</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indicator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Achievement
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  HIV Testing Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">487</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">97%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  Linkage to Care
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">95%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">93%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">98%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  Viral Load Suppression
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">90%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">94%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">104%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  PMTCT Coverage
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">100%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">100%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HIVReport;