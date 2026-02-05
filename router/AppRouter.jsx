import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AutoLogoutHandler from "../auth/AutoLogoutHandler";
import "../App.css";

import LoginContainer from "../auth/LoginContainer";
import TwoFactorAuth from "../auth/TwoFactorAuth";
import ForgotPassword from "../auth/ForgotPassword";
import Home from "../pages/Home";
import Index from "../pages/Dashboard/Index";
import Appointments from "../pages/appointments/Appointments";
import Prescription from "../pages/prescription/Prescription";
import Referrals from "../pages/referrals/Referrals";
import Pharmacy from "../pages/pharmacy/Pharmacy";
import Laboratory from "../pages/Laboratory/Laboratory";
import MedicalRecordTab from "../pages/treatment-plan/MedicalRecordTab";
import Receipts from "../pages/Billing/Receipts";
import MOHForms from "../pages/MOH Forms/MOHForms";
import Reports from "../pages/Reports/Reports";
import Patient from "../pages/Patient/PatientDashboard";

import { useAuth } from "../auth/useAuth";
import Triage from "../pages/clinical/Triage";
import Registry from "../pages/clinical/Registry";

import Billing from "../pages/billing/Billing";
import Bedrest from "../pages/bedrest-management/Bedrest";
import PatientView from "../pages/clinical/PatientView";

// Role whitelist
const roleAllowed = [
  "admin",
  "doctor",
  "nurse",
  "receptionist",
  "pharmacist",
  "lab technician",
  "cashier",
  "hospital administrator",
  "patient",
  "triage nurse",
];

// Auth guard component
const AuthWrapper = ({ children }) => {
  const { user, twoFactorVerified, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;
  if (!twoFactorVerified) return <Navigate to="/2fa" replace />;
  if (!roleAllowed.includes(user.role)) return <Navigate to="/app" replace />;

  return children || <Outlet />;
};

// New ErrorBoundary component
const AuthErrorBoundary = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Session Expired</h1>
        <p className="mb-4">Please login again to continue</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LoginContainer />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/2fa",
      element: <TwoFactorAuth />,
    },
    {
      path: "/app",
      element: (
        <AuthWrapper>
          <AutoLogoutHandler />
          <Home />
        </AuthWrapper>
      ),
      errorElement: <AuthErrorBoundary />,
      children: [
        { index: true, element: <Index /> },
        { path: "appointments", element: <Appointments /> },
        { path: "prescription", element: <Prescription /> },
        { path: "triage", element: <Triage /> },
        { path: "registry", element: <Registry /> },
        { path: "registry/:patientId", element: <PatientView /> },
        { path: "referrals", element: <Referrals /> },
        { path: "pharmacy", element: <Pharmacy /> },
        { path: "laboratory", element: <Laboratory /> },
        { path: "billing", element: <Billing /> },
        { path: "treatment-plan", element: <MedicalRecordTab /> },
        { path: "receipts", element: <Receipts /> },
        { path: "mohforms", element: <MOHForms /> },
        { path: "reports", element: <Reports /> },
        { path: "patient", element: <Patient /> },
        { path: "bedrest-management", element: <Bedrest /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
  {
    basename:"/",
    // basename: import.meta.env.MODE === "development" ? "/" : "/wanene-ehr/dist/",
  }
);

export default router;
