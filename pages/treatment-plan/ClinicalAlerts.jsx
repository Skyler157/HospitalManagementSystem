// ClinicalAlerts.js

import {
  X,
  AlertTriangle,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ClinicalAlerts = ({ alerts, onDismiss }) => {
  return (
    <div
      aria-live="assertive"
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col space-y-2 max-w-md w-full px-4"
    >
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`flex items-start space-x-3 rounded border-l-4 p-4 shadow-lg animate-slide-up bg-white dark:bg-gray-800 ${
            alert.type === "warning"
              ? "border-yellow-400"
              : alert.type === "error"
              ? "border-red-500"
              : "border-blue-500"
          }`}
        >
          <div className="pt-0.5">
            {alert.type === "warning" ? (
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            ) : alert.type === "error" ? (
              <AlertCircle className="w-6 h-6 text-red-500" />
            ) : (
              <CheckCircle className="w-6 h-6 text-blue-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {alert.title}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {alert.message}
            </p>
          </div>
          <button
            onClick={() => onDismiss(index)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Dismiss notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};


export default ClinicalAlerts;