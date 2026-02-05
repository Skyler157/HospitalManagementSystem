// import { ChevronLeft } from "lucide-react";
// import React from "react";
// import { HiOutlineMail } from "react-icons/hi";

// const InputField = ({ id, label, type, value, onChange }) => (
//   <div className="mb-4">
//     <label htmlFor={id} className="block mb-1 font-semibold">
//       {label}
//     </label>
//     <input
//       id={id}
//       type={type}
//       className="w-full border rounded px-3 py-2"
//       value={value}
//       onChange={onChange}
//       required
//     />
//   </div>
// );

// const ForgotPassword = ({ email, setEmail, handleSubmit, error }) => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl mb-6 text-center font-thin">Forgot Password</h2>
//         <p className="mb-4 text-center text-gray-600">
//           Enter your email address to receive a password reset link.
//         </p>

//         {error && (
//           <div className="mb-4 text-red-600 font-semibold text-center">
//             {error}
//           </div>
//         )}

//         <InputField
//           id="email"
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="justify-center mx-auto block w-full bg-primary text-white py-2 mt-8 rounded-full hover:bg-blue-800 transition duration-100"
//         >
//           Send Reset Link
//           <HiOutlineMail className="inline-block ml-2" />
//         </button>
//         <a
//           href="/"
//           className="text-blue-500 hover:underline mt-4 block text-right"
//         >
//           Back to Login
//         </a>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;







import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";

const InputField = ({ id, label, type, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 font-semibold">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full border rounded px-3 py-2"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setEmail("");

    // Example dummy logic:
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
    } else {
      try {
        // Simulate async call
        await new Promise((res) => setTimeout(res, 500));
        setMessage("Password reset link sent successfully!");
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 text-center font-thin">Forgot Password</h2>
        <p className="mb-4 text-center text-gray-600">
          Enter your email address to receive a password reset link.
        </p>

        {/* Banner: Success */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
            {message}
          </div>
        )}

        {/* Banner: Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="justify-center mx-auto block w-full bg-primary text-white py-2 mt-8 rounded-full hover:bg-blue-800 transition duration-100"
        >
          Send Reset Link
          <HiOutlineMail className="inline-block ml-2" />
        </button>

        <a
          href="/"
          className="text-blue-500 hover:underline mt-4 block text-right"
        >
          Back to Login
        </a>
      </form>
    </div>
  );
};

export default ForgotPassword;
