import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const TwoFactorAuth = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For POC, hardcode the 2FA code as "4444"
    if (code === "4444") {
      auth.verify2FA();
      navigate("/app");
    } else {
      setError("Invalid 2FA code");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 text-center font-thin">Two-Factor Authentication</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="code" className="block mb-1 font-semibold">
            Enter 2FA Code
          </label>
          <input
            id="code"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-full mt-5 hover:bg-blue-800 transition duration-100"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default TwoFactorAuth;
