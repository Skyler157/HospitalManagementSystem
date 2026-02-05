import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const MOHForms = () => {
  const [forms, setForms] = useState([
    "MOH 302", "MOH 303", "MOH 304", "MOH 305", "MOH 306", "MOH 308", "MOH 309",
    "MOH 310", "MOH 311", "MOH 312", "MOH 400", "MOH 402", "MOH 401", "MOH 403",
    "MOH 404", "MOH 406", "MOH 407", "MOH 708", "MOH 500", "MOH 501", "MOH 502",
    "MOH 600", "MOH 601", "MOH 602", "MOH 603", "MOH 700", "MOH 703", "MOH 802",
    "MOH 803", "MOH 902", "MOH 801", "MOH 1000", "MOH 1001"
  ]);

  const [newForm, setNewForm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [showFilesModal, setShowFilesModal] = useState(false);

  const handleAddForm = (e) => {
    e.preventDefault();
    const formName = newForm.trim();

    if (!formName) return toast.error("Form name cannot be empty");
    if (forms.includes(formName)) return toast.error("Form already exists");

    setForms([...forms, formName]);
    setNewForm("");
    toast.success("Form added successfully");
  };

  const handleFormClick = (form) => {
    setSelectedForm(form);
    setSelectedFiles([]);
    setShowModal(true);
  };

  const handleFileUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("No file selected");
      return;
    }

    const fileList = Array.from(selectedFiles).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    setUploadedFiles(prev => ({
      ...prev,
      [selectedForm]: [...(prev[selectedForm] || []), ...fileList]
    }));

    toast.success(`${fileList.length} file(s) uploaded for ${selectedForm}`);
    setShowModal(false);
  };

  const handleViewFiles = (form) => {
    setSelectedForm(form);
    setShowFilesModal(true);
  };

  return (
    <div className="px-6 py-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-center uppercase">MOH Forms</h1>

      <form onSubmit={handleAddForm} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newForm}
          onChange={(e) => setNewForm(e.target.value)}
          placeholder="Enter new MOH form name"
          className="border border-gray-400 p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Add Form
        </button>
      </form>

      <table className="w-full table-auto border shadow bg-white">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Form Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="p-2 border">{index + 1}</td>
              <td
                className="p-2 border text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleFormClick(form)}
              >
                {form}
              </td>
              <td className="p-2 border">
                {uploadedFiles[form] && (
                  <button
                    onClick={() => handleViewFiles(form)}
                    className="text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Files for {selectedForm}</h2>
            <input
              type="file"
              multiple
              className="mb-4"
              onChange={(e) => setSelectedFiles(e.target.files)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Files Modal */}
      {showFilesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Uploaded Files for {selectedForm}</h2>
            {uploadedFiles[selectedForm]?.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-auto">
                {uploadedFiles[selectedForm].map((file, idx) => (
                  <li key={idx}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files uploaded for this form.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setShowFilesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MOHForms;
