import React, { useState, useEffect } from "react";
import { BsTrash3, BsEye, BsPencil, BsPrinter } from "react-icons/bs";
import { toast, Toaster } from "react-hot-toast";

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedReceipts = JSON.parse(sessionStorage.getItem("receipts") || "[]");
    setReceipts(storedReceipts);
  }, []);

  const handleAddReceipt = (e) => {
    e.preventDefault();
    const form = e.target;
    const newReceipt = {
      patientName: form.patientName.value,
      dateIssued: form.dateIssued.value,
      items: form.items.value.split(",").map((item) => item.trim()),
      amount: form.amount.value,
      paymentMethod: form.paymentMethod.value,
    };

    const updated = [...receipts, newReceipt];
    sessionStorage.setItem("receipts", JSON.stringify(updated));
    setReceipts(updated);
    form.reset();
    toast.success("Receipt added successfully!");
  };

  const deleteReceipt = (index) => {
    const updated = receipts.filter((_, i) => i !== index);
    sessionStorage.setItem("receipts", JSON.stringify(updated));
    setReceipts(updated);
    toast.success("Receipt deleted!");
  };

  const openModal = (receipt, index, mode = "view") => {
    setSelectedReceipt({ ...receipt, index });
    setEditMode(mode === "edit");
    setModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedReceipt({ ...selectedReceipt, [name]: value });
  };

  const handleUpdateReceipt = () => {
    const updated = [...receipts];
    updated[selectedReceipt.index] = {
      ...selectedReceipt,
      items: selectedReceipt.items.split(",").map((i) => i.trim()),
    };
    sessionStorage.setItem("receipts", JSON.stringify(updated));
    setReceipts(updated);
    toast.success("Receipt updated!");
    setModalOpen(false);
  };

  const handlePrint = () => {
    const content = document.getElementById("printable").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Receipt</title></head><body>${content}</body></html>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="px-6">
      <Toaster />
      <h1 className="text-2xl font-bold text-center mb-6 uppercase">Receipts</h1>

      {/* Add Receipt Form */}
      <form
        onSubmit={handleAddReceipt}
        className="mb-6 space-y-4 bg-gray-100 p-4 rounded shadow"
      >
        <input
          name="patientName"
          placeholder="Patient Name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="dateIssued"
          type="date"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="items"
          placeholder="Drugs/ Lab/ Consultation"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Total Amount"
          className="border p-2 w-full rounded"
          required
        />
        <select
          name="paymentMethod"
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Mpesa">Mpesa</option>
          <option value="Insurance">Insurance</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Add Receipt
        </button>
      </form>

      {/* Receipts Table */}
      <table className="w-full table-auto border shadow bg-white">
        <thead>
          <tr className="bg-slate-400 text-white">
            <th className="border p-2">Patient</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No receipts available.
              </td>
            </tr>
          ) : (
            receipts.map((receipt, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border p-2">{receipt.patientName}</td>
                <td className="border p-2">{receipt.dateIssued}</td>
                <td className="border p-2">{receipt.items.join(", ")}</td>
                <td className="border p-2">Ksh {receipt.amount}</td>
                <td className="border p-2">{receipt.paymentMethod}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => openModal(receipt, index, "view")}
                    className="text-blue-600"
                    title="View"
                  >
                    <BsEye />
                  </button>
                  <button
                    onClick={() => openModal(receipt, index, "edit")}
                    className="text-green-600"
                    title="Edit"
                  >
                    <BsPencil />
                  </button>
                  <button
                    onClick={() => deleteReceipt(index)}
                    className="text-red-600"
                    title="Delete"
                  >
                    <BsTrash3 />
                  </button>
                  <button
                    onClick={() => openModal(receipt, index)}
                    className="text-purple-600"
                    title="Print"
                  >
                    <BsPrinter />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[90%] md:w-[500px] shadow relative">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Receipt" : "Receipt Details"}
            </h2>

            <div id="printable">
              {editMode ? (
                <>
                  <input
                    name="patientName"
                    value={selectedReceipt.patientName}
                    onChange={handleModalChange}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="date"
                    name="dateIssued"
                    value={selectedReceipt.dateIssued}
                    onChange={handleModalChange}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    name="items"
                    value={selectedReceipt.items}
                    onChange={handleModalChange}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="number"
                    name="amount"
                    value={selectedReceipt.amount}
                    onChange={handleModalChange}
                    className="border p-2 w-full mb-2"
                  />
                  <select
                    name="paymentMethod"
                    value={selectedReceipt.paymentMethod}
                    onChange={handleModalChange}
                    className="border p-2 w-full mb-4"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Mpesa">Mpesa</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="mb-2">
                    <strong>Patient Name:</strong> {selectedReceipt.patientName}
                  </p>
                  <p className="mb-2">
                    <strong>Date Issued:</strong> {selectedReceipt.dateIssued}
                  </p>
                  <p className="mb-2">
                    <strong>Items:</strong>{" "}
                    {Array.isArray(selectedReceipt.items)
                      ? selectedReceipt.items.join(", ")
                      : selectedReceipt.items}
                  </p>
                  <p className="mb-2">
                    <strong>Amount:</strong> Ksh {selectedReceipt.amount}
                  </p>
                  <p className="mb-4">
                    <strong>Payment Method:</strong> {selectedReceipt.paymentMethod}
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              {editMode ? (
                <button
                  onClick={handleUpdateReceipt}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handlePrint}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Print
                </button>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
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

export default Receipts;
