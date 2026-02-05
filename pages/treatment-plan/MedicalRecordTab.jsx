import { useState, useEffect } from "react";
import {
  Search,
  Save,
  Upload,
  Mic,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  RefreshCw,
} from "lucide-react";
import PlanTab from "./PlanTab";
import DiagnosisTab from "./DiagnosisTab";
import EncounterTab from "./EncounterTab";
import HistoryTab from "./HistoryTab";
import ClinicalAlerts from "./ClinicalAlerts";

// Sample patient data

const samplePatients = [
  {
    id: "12345678",
    name: "John Doe",
    dob: "1985-05-15",
    gender: "Male",
    phone: "0712345678",
    email: "john.doe@example.com",
    address: "123 Main St, Nairobi",
    nationalId: "12345678",
    nhifNumber: "NHIF12345",
    photo: null,
    emergencyContact: {
      name: "Jane Doe",
      phone: "0723456789",
    },
    allergies: [
      {
        id: 1,
        type: "Penicillin",
        severity: "Severe",
        reaction: "Anaphylaxis",
      },
      { id: 2, type: "Pollen", severity: "Moderate", reaction: "Rhinitis" },
    ],
    conditions: [
      {
        id: 1,
        condition: "Hypertension",
        diagnosed: "2020-05-15",
        status: "Active",
      },
      {
        id: 2,
        condition: "Type 2 Diabetes",
        diagnosed: "2018-11-10",
        status: "Active",
      },
    ],
    visits: [
      {
        id: 1,
        date: "2025-05-10",
        type: "General Medical Checkup",
        summary:
          "Blood pressure check. Prescribed losartan for hypertension management.",
        isRecent: true,
        soap: {
          subjective:
            "Patient reports occasional headaches and dizziness. No chest pain.",
          objective: "BP: 145/90, Pulse: 72, Weight: 85kg, BMI: 28.4",
          assessment: "Hypertension - poorly controlled",
          plan: "Increase losartan to 100mg daily. Review in 2 weeks.",
        },
        diagnoses: [
          { code: "I10", description: "Essential (primary) hypertension" },
        ],
        prescriptions: [
          {
            medication: "Losartan",
            dosage: "100mg",
            frequency: "Once daily",
            duration: "30 days",
          },
        ],
      },
      {
        id: 2,
        date: "2025-03-15",
        type: "Diabetes Follow-up",
        summary: "HbA1c test: 7.2%. Continued metformin therapy.",
        isRecent: false,
        soap: {
          subjective: "No new complaints. Maintaining diet restrictions.",
          objective: "BP: 138/85, Pulse: 70, Weight: 86kg, HbA1c: 7.2%",
          assessment: "Type 2 Diabetes - moderately controlled",
          plan: "Continue current medications. Review in 3 months.",
        },
        diagnoses: [
          {
            code: "E11.9",
            description: "Type 2 diabetes mellitus without complications",
          },
        ],
        prescriptions: [
          {
            medication: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            duration: "90 days",
          },
        ],
      },
      {
        id: 3,
        date: "2025-01-20",
        type: "Common Cold",
        summary:
          "Symptoms of cold. Prescribed rest and increased fluid intake.",
        isRecent: false,
        soap: {
          subjective: "Runny nose, sore throat, and mild cough for 3 days.",
          objective:
            "Temp: 37.2°C, BP: 130/82, Pulse: 75, Throat: mild erythema",
          assessment: "Common cold/Upper respiratory infection",
          plan: "Rest, increase fluids. Paracetamol for symptomatic relief.",
        },
        diagnoses: [
          { code: "J00", description: "Acute nasopharyngitis [common cold]" },
        ],
        prescriptions: [
          {
            medication: "Paracetamol",
            dosage: "500mg",
            frequency: "As needed, up to 4 times daily",
            duration: "5 days",
          },
        ],
      },
    ],
    treatmentPlan: [
      {
        medication: "Losartan",
        dosage: "100mg",
        duration: "30 days",
      },
      {
        medication: "Metformin",
        dosage: "500mg",
        duration: "90 days",
      },
      {
        medication: "Paracetamol",
        dosage: "500mg",
        duration: "5 days",
      },
    ],
    diagnoses: [
      {
        condition: "Malaria (B50)'",
        date: "2024-06-20",
        severity: "Moderate",
      },
    ],
  },
  {
    id: "87654321",
    name: "Jane Smith",
    dob: "1990-11-20",
    gender: "Female",
    phone: "0723456789",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Mombasa",
    nationalId: "87654321",
    nhifNumber: "NHIF54321",
    photo: null,
    emergencyContact: {
      name: "John Smith",
      phone: "0734567890",
    },
    allergies: [
      {
        id: 1,
        type: "NSAIDs",
        severity: "Moderate",
        reaction: "Rash and hives",
      },
    ],
    conditions: [
      { id: 1, condition: "Asthma", diagnosed: "2015-03-22", status: "Active" },
      { id: 2, condition: "HIV", diagnosed: "2019-07-14", status: "Active" },
    ],
    visits: [
      {
        id: 1,
        date: "2025-04-25",
        type: "HIV Management",
        summary:
          "CD4 count 650. Viral load undetectable. Continue current ART regimen.",
        isRecent: true,
        soap: {
          subjective: "No new complaints. Medication adherence good.",
          objective:
            "CD4: 650, Viral Load: <20 copies/ml, BP: 120/75, Weight: 60kg",
          assessment: "HIV - well controlled on current regimen",
          plan: "Continue current ART. Next viral load in 6 months.",
        },
        diagnoses: [{ code: "B20", description: "HIV disease" }],
        prescriptions: [
          {
            medication: "Dolutegravir/Lamivudine/Tenofovir",
            dosage: "50/300/300mg",
            frequency: "Once daily",
            duration: "90 days",
          },
        ],
      },
      {
        id: 2,
        date: "2025-02-10",
        type: "Asthma Review",
        summary: "Mild exacerbation in past month. Adjusted inhaler technique.",
        isRecent: false,
        soap: {
          subjective:
            "Reports increasing use of rescue inhaler during cold weather.",
          objective:
            "Lung sounds: scattered wheezes on exhalation, PEF: 85% predicted",
          assessment: "Mild persistent asthma - seasonal exacerbation",
          plan: "Continue maintenance inhaler. Add rescue inhaler as needed.",
        },
        diagnoses: [
          {
            code: "J45.30",
            description: "Mild persistent asthma, uncomplicated",
          },
        ],
        prescriptions: [
          {
            medication: "Fluticasone/Salmeterol",
            dosage: "250/50mcg",
            frequency: "Twice daily",
            duration: "60 days",
          },
          {
            medication: "Salbutamol",
            dosage: "100mcg",
            frequency: "As needed",
            duration: "60 days",
          },
        ],
      },
    ],
    treatmentPlan: [
      {
        medication: "Dolutegravir/Lamivudine/Tenofovir",
        dosage: "50/300/300mg",
        duration: "90 days",
      },
      {
        medication: "Fluticasone/Salmeterol",
        dosage: "250/50mcg",
        duration: "60 days",
      },
      {
        medication: "Salbutamol",
        dosage: "100mcg",
        duration: "60 days",
      },
    ],
    diagnoses: [
      {
        condition: "Cholera (A00)",
        date: "2024-07-01",
        severity: "Severe",
      },
    ],
  },
];

// Template definitions
const clinicalTemplates = {
  hiv: {
    name: "HIV Treatment Protocol",
    soap: {
      subjective:
        "Ask about: medication adherence, new symptoms, opportunistic infections, mental health status.",
      objective:
        "Vital signs, weight change, physical exam focused on opportunistic infections, CD4 count, viral load.",
      assessment:
        "HIV status (controlled/uncontrolled), treatment efficacy, complications if any.",
      plan: "ART regimen, prophylaxis if needed, follow-up schedule, adherence counseling.",
    },
    commonDiagnoses: ["B20", "B22.7", "B23.8"],
    commonMedications: ["Dolutegravir", "Lamivudine", "Tenofovir", "Efavirenz"],
  },
  tb: {
    name: "TB Assessment and Treatment",
    soap: {
      subjective:
        "Cough duration, hemoptysis, night sweats, weight loss, fever, contact history.",
      objective:
        "Vital signs, weight, lung examination, sputum results, chest X-ray findings.",
      assessment:
        "TB diagnosis (pulmonary/extrapulmonary), HIV co-infection status, treatment category.",
      plan: "Anti-TB regimen, monitoring schedule, contact tracing, nutritional support.",
    },
    commonDiagnoses: ["A15.0", "A15.3", "A19.9"],
    commonMedications: [
      "Rifampicin",
      "Isoniazid",
      "Pyrazinamide",
      "Ethambutol",
    ],
  },
  anc: {
    name: "Antenatal Care Visit",
    soap: {
      subjective:
        "Pregnancy symptoms, fetal movement, danger signs, medication adherence.",
      objective:
        "BP, weight, fundal height, fetal heart rate, edema assessment, lab results.",
      assessment:
        "Gestational age, pregnancy risk category, any complications.",
      plan: "Supplements, vaccines, screening tests, next visit schedule, delivery planning.",
    },
    commonDiagnoses: ["Z34.0", "O24.4", "O13"],
    commonMedications: ["Ferrous Sulfate", "Folic Acid", "Calcium"],
  },
  diabetes: {
    name: "Diabetes Management",
    soap: {
      subjective:
        "Symptoms of hypo/hyperglycemia, diet adherence, home glucose monitoring results.",
      objective:
        "Weight, BP, foot exam, HbA1c, lipid profile, kidney function tests.",
      assessment: "Diabetes control status, presence of complications.",
      plan: "Medication adjustments, lifestyle modifications, monitoring schedule, specialist referrals if needed.",
    },
    commonDiagnoses: ["E11.9", "E11.40", "E11.51"],
    commonMedications: ["Metformin", "Glibenclamide", "Insulin"],
  },
};

const checkForAlerts = () => {
  // Here you would implement your logic to check for drug interactions or guidelines
  // For demonstration, let's add a sample alert
  const newAlerts = [
    {
      type: "warning",
      title: "Drug Interaction Warning",
      message:
        "The prescribed medication may interact with the patient's current medication.",
    },
    {
      type: "error",
      title: "Guideline Reminder",
      message: "Please follow the ART protocol for this patient.",
    },
  ];
  setAlerts(newAlerts);
};

// Main Application Component
export default function MedicalRecordApp() {
  const [activeTab, setActiveTab] = useState("medicalRecord");
  const [activeMedicalSubTab, setActiveMedicalSubTab] = useState("history");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("idle"); // idle, saving, saved
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    patientInfo: true,
    clinicalInfo: true,
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({});
  const [alerts, setAlerts] = useState([]);

  // Load patient data when selected
  useEffect(() => {
    if (selectedPatient) {
      // Pre-fill form with patient data
      setFormData({
        name: selectedPatient.name,
        dob: selectedPatient.dob,
        gender: selectedPatient.gender,
        phone: selectedPatient.phone,
        email: selectedPatient.email,
        address: selectedPatient.address,
        nationalId: selectedPatient.nationalId,
        nhifNumber: selectedPatient.nhifNumber,
        upi: selectedPatient.id,
        emergencyContactName: selectedPatient.emergencyContact?.name || "",
        emergencyContactPhone: selectedPatient.emergencyContact?.phone || "",
      });

      // Automatically trigger auto-save
      triggerAutoSave();
    }
  }, [selectedPatient]);

  // Apply a clinical template
  const applyTemplate = (templateKey) => {
    const template = clinicalTemplates[templateKey];
    if (template) {
      // Pre-fill the SOAP note with template content
      setTemplateApplied(template);

      // Switch to encounter tab to show the template
      setActiveMedicalSubTab("encounter");

      // Close template menu
      setShowTemplateMenu(false);

      // Show notification
      setNotification({
        visible: true,
        message: `Applied ${template.name} template`,
        type: "success",
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ visible: false });
      }, 3000);
    }
  };

  // Handle patient selection
  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setIsSearchOpen(false);

    // Show notification
    setNotification({
      visible: true,
      message: `Patient ${patient.name} loaded successfully`,
      type: "success",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ visible: false });
    }, 3000);
  };

  // Auto-save functionality
  const triggerAutoSave = () => {
    setAutoSaveStatus("saving");

    // Simulate save operation finishing after 1 second
    setTimeout(() => {
      setAutoSaveStatus("saved");

      // Reset status after 3 seconds
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 3000);
    }, 1000);
  };

  // Notification system
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "info", // info, success, warning, error
  });

  // Template system
  const [templateApplied, setTemplateApplied] = useState(null);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Handle manual save
  const handleSave = () => {
    triggerAutoSave();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // AutoSave status indicator
  const renderAutoSaveStatus = () => {
    switch (autoSaveStatus) {
      case "saving":
        return (
          <div className="flex items-center text-yellow-600 text-sm">
            <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            <span>Saving...</span>
          </div>
        );
      case "saved":
        return (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Saved</span>
          </div>
        );
      default:
        return null;
    }
  };
  // Dismiss individual alert
  const dismissAlert = (index) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };
  const checkForAlerts = () => {
    // Here you would implement your logic to check for drug interactions or guidelines
    // For demonstration, let's add a sample alert
    const newAlerts = [
      {
        type: "warning",
        title: "Drug Interaction Warning",
        message:
          "The prescribed medication may interact with the patient's current medication.",
      },
      {
        type: "error",
        title: "Guideline Reminder",
        message: "Please follow the ART protocol for this patient.",
      },
    ];
    setAlerts(newAlerts);
  };

  useEffect(() => {
    if (selectedPatient) {
      // Check for alerts whenever a patient is selected
      checkForAlerts();
    }
  }, [selectedPatient]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Notification Toast */}
      <ClinicalAlerts alerts={alerts} onDismiss={dismissAlert} />
      {notification.visible && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-50 border-l-4 border-green-500"
              : notification.type === "error"
              ? "bg-red-50 border-l-4 border-red-500"
              : notification.type === "warning"
              ? "bg-yellow-50 border-l-4 border-yellow-500"
              : "bg-blue-50 border-l-4 border-blue-500"
          }`}
        >
          {notification.type === "success" && (
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          )}
          {notification.type === "error" && (
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          )}
          {notification.type === "warning" && (
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          )}
          {notification.type === "info" && (
            <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
          )}
          <p
            className={`${
              notification.type === "success"
                ? "text-green-800"
                : notification.type === "error"
                ? "text-red-800"
                : notification.type === "warning"
                ? "text-yellow-800"
                : "text-blue-800"
            }`}
          >
            {notification.message}
          </p>
        </div>
      )}

      <div className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Medical Records System</h1>
          <div className="flex space-x-2">
            {renderAutoSaveStatus()}
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "medicalRecord"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("medicalRecord")}
        >
          Medical Record
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "medicalRecord" && (
          <div>
            {/* Patient Search Bar */}
            <div className="mb-4 flex items-center">
              <div className="relative flex-1 mr-2">
                <input
                  type="text"
                  placeholder="Search for existing patient (UPI, Name, Phone)"
                  className="w-full p-2 pl-8 border rounded"
                  onClick={() => setIsSearchOpen(true)}
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />

                {isSearchOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                    <div className="p-2 text-sm text-gray-500">
                      Type to search for patients...
                    </div>
                    {samplePatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="border-t p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectPatient(patient)}
                      >
                        <div className="font-medium">
                          {patient.name} (UPI: {patient.id})
                        </div>
                        <div className="text-sm text-gray-600">
                          DOB: {new Date(patient.dob).toLocaleDateString()} |
                          Phone: {patient.phone}
                        </div>
                      </div>
                    ))}
                    <div
                      className="border-t p-2 text-center text-blue-600 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      Close
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center">
                <RefreshCw className="w-4 h-4 mr-1" />
                New Patient
              </button>
            </div>

            {/* Patient Info Section */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-3 bg-gray-50 rounded-t-lg border-b flex justify-between items-center">
                <h2 className="font-medium text-gray-800 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Patient Information
                </h2>
                <button
                  onClick={() => toggleSection("patientInfo")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedSections.patientInfo ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedSections.patientInfo && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth*
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                          <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender*
                        </label>
                        <select
                          name="gender"
                          value={formData.gender || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          National ID
                        </label>
                        <input
                          type="text"
                          name="nationalId"
                          value={formData.nationalId || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NHIF Number
                        </label>
                        <input
                          type="text"
                          name="nhifNumber"
                          value={formData.nhifNumber || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          UPI
                        </label>
                        <input
                          type="text"
                          name="upi"
                          value={formData.upi || "UPI will be generated"}
                          readOnly
                          className="w-full p-2 border rounded bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-8 border rounded"
                          />
                          <Phone className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-8 border rounded"
                          />
                          <Mail className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="relative">
                          <textarea
                            name="address"
                            value={formData.address || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-8 border rounded"
                            rows="2"
                          ></textarea>
                          <Home className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 h-40">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          Click or drag to upload patient photo
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Emergency Contact
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded mb-2"
                          placeholder="Name"
                        />
                        <input
                          type="tel"
                          className="w-full p-2 border rounded"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Information Section */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-3 bg-gray-50 rounded-t-lg border-b flex justify-between items-center">
                <h2 className="font-medium text-gray-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Clinical Information
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded text-sm flex items-center"
                    >
                      Templates
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {showTemplateMenu && (
                      <div className="absolute right-0 mt-1 bg-white rounded shadow-lg border z-10 w-64">
                        <div className="p-2 text-sm font-medium border-b">
                          Select Template
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("hiv")}
                          >
                            HIV Treatment Protocol
                          </button>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("tb")}
                          >
                            TB Assessment and Treatment
                          </button>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("anc")}
                          >
                            Antenatal Care Visit
                          </button>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("diabetes")}
                          >
                            Diabetes Management
                          </button>
                          <button className="w-full text-left p-2 hover:bg-gray-100 text-sm">
                            Hypertension Follow-up
                          </button>
                          <button className="w-full text-left p-2 hover:bg-gray-100 text-sm">
                            General Medical Exam
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSection("clinicalInfo")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedSections.clinicalInfo ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {expandedSections.clinicalInfo && (
                <div>
                  {/* Clinical Sub-tabs */}
                  <div className="flex border-b">
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "history"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("history")}
                    >
                      History
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "encounter"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("encounter")}
                    >
                      Encounter
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "diagnosis"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("diagnosis")}
                    >
                      Diagnosis
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "plan"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("plan")}
                    >
                      Plan
                    </button>
                  </div>

                  {/* Sub-tab Content */}
                  {/* Sub-tab Content */}
                  <div className="p-4">
                    {activeMedicalSubTab === "history" && (
                      <HistoryTab selectedPatient={selectedPatient} />
                    )}
                    {activeMedicalSubTab === "encounter" && (
                      <EncounterTab
                        selectedPatient={selectedPatient}
                        templateApplied={templateApplied}
                      />
                    )}
                    {activeMedicalSubTab === "diagnosis" && (
                      <DiagnosisTab selectedPatient={selectedPatient} />
                    )}
                    {activeMedicalSubTab === "plan" && (
                      <PlanTab selectedPatient={selectedPatient} templateApplied ={templateApplied} patientId={selectedPatient.id} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                Cancel
              </button>
              <div className="space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Save & Proceed to Triage
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "medicalRecord" && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            <h3 className="text-xl mb-2">This module is under development</h3>
            <p>The {activeTab} functionality will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Encounter Tab Component
