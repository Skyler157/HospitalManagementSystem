import { useState, useEffect } from "react";

export default function NHIFClaimSection() {
  const testClaims = [
    {
      id: 1747301228551,
      name: "Dr wanene talisis EHR system documantation (1).pdf",
      url: "blob:http://localhost:5173/d5e4a58d-cc28-4db9-aa2d-f62e3392b67e",
      patient: "John Doe",
      status: "Pending",
      date: "5/15/2025",
    },
    {
      id: 1747301228552,
      name: "Blood Test Results.pdf",
      url: "blob:http://localhost:5173/a1f2b3c4-cc28-4db9-aa2d-f62e3392b88f",
      patient: "Jane Smith",
      status: "Approved",
      date: "5/14/2025",
    },
  ];

  const [claimForms, setClaimForms] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  // Load test + saved claims
  useEffect(() => {
    const savedClaims = localStorage.getItem("nhifClaims");
    try {
      const dynamicClaims = savedClaims ? JSON.parse(savedClaims) : [];
      setClaimForms([...testClaims, ...dynamicClaims]);
    } catch (e) {
      console.error("Failed to parse saved claims", e);
      setClaimForms(testClaims);
    }
  }, []);

  // Save only dynamic claims to localStorage
  useEffect(() => {
    const dynamicOnly = claimForms.filter((claim) => claim.id >= 2000000000000);
    if (dynamicOnly.length > 0) {
      localStorage.setItem("nhifClaims", JSON.stringify(dynamicOnly));
    }
  }, [claimForms]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    setSelectedFile(null);
    setFileInputKey(Date.now());
  };

  const handleUpload = () => {
    if (!patientName.trim()) {
      alert("Please enter patient name before uploading.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a PDF file to upload.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        const url = URL.createObjectURL(selectedFile);
        const newClaim = {
          id: Date.now() + 1000000000000,
          name: selectedFile.name,
          url,
          patient: patientName,
          status: "Pending",
          date: new Date().toLocaleDateString(),
        };

        setClaimForms((prev) => [...prev, newClaim]);
        setPatientName("");
        resetFileInput();
        setIsLoading(false);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload file. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleView = (url) => {
    setSelectedFileUrl(url);
    setIsModalOpen(true);
  };

  const approveClaim = (id) => {
    setClaimForms((prev) =>
      prev.map((claim) =>
        claim.id === id ? { ...claim, status: "Approved" } : claim
      )
    );
  };

  const deleteClaim = (id) => {
    if (confirm("Are you sure you want to delete this claim?")) {
      setClaimForms((prev) => prev.filter((claim) => claim.id !== id));
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload NHIF Claim Form</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Claim Document (PDF only)
            </label>
            <div className="flex items-center">
              <input
                type="file"
                key={fileInputKey}
                accept="application/pdf"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileSelect}
              />
              {selectedFile && (
                <span className="ml-2 text-sm text-gray-500">
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>
          <button
            className={`px-4 py-2 rounded-md font-medium text-white 
              ${
                isLoading || !selectedFile || !patientName.trim()
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            onClick={handleUpload}
            disabled={isLoading || !selectedFile || !patientName.trim()}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload Claim"
            )}
          </button>
        </div>
      </div>

      {claimForms.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Uploaded Claims</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claimForms.map((form) => (
                  <tr key={form.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {form.patient}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {form.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          form.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {form.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{form.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleView(form.url)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      {/* {form.status === "Pending" && (
                        <button
                          onClick={() => approveClaim(form.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Approve
                        </button>
                      )} */}
                      {/* <button
                        onClick={() => deleteClaim(form.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No claims uploaded yet. Upload a claim form to get started.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-4/5 h-4/5 max-w-4xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">NHIF Claim Document</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="p-4 h-full">
              {selectedFileUrl && (
                <iframe
                  src={selectedFileUrl}
                  title="NHIF Claim"
                  className="w-full h-full border-0 rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
