import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP & new password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Send OTP to email
  const handleSendOtp = async () => {
    try {
      await axios.post(BASE_URL + "/forgotpassword", { email }, { withCredentials: true });
      setStep(2); // Move to OTP step
      setSuccess("OTP sent to your email.");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Verify OTP & Reset Password
  const handleResetPassword = async () => {
    try {
      await axios.post(BASE_URL + "/resetpassword", { email, otp, newPassword },{ withCredentials: true });
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md p-8 bg-gray-300 rounded-xl shadow-xl">
    <h2 className="text-center text-2xl font-bold text-gray-700">
      {step === 1 ? "Forgot Password" : "Reset Password"}
    </h2>

    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}

    <div className="mt-6 space-y-4">
      {step === 1 ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 rounded-md bg-gray-500 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <button
            onClick={handleSendOtp}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-400">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md bg-gray-500 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md bg-gray-500 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <button
            onClick={handleResetPassword}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  </div>
</div>

  );
};

export default ForgotPassword;
