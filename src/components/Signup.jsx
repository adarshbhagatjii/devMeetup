import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Signup and OTP Sending
  const handleSignup = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      alert("OTP sent to your email. Please verify.");
      setShowOtpInput(true);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/verify",
        { email, otp },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data)); // Add user to redux store
      navigate("/profile"); // Redirect after successful verification
    } catch (err) {
      setError(err?.response?.data || "Invalid OTP");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md p-8 bg-gray-300 rounded-xl shadow-2xl mb-20 mt-10">
    <h2 className="text-center text-2xl font-bold text-gray-700">
      {showOtpInput ? "Verify OTP" : "Create an Account"}
    </h2>

    <div className="mt-6">
      {!showOtpInput ? (
        <div className="space-y-4">
          {[
            { label: "First Name", type: "text", value: firstName, setter: setFirstName },
            { label: "Last Name", type: "text", value: lastName, setter: setLastName },
            { label: "Email Address", type: "email", value: email, setter: setEmail },
            { label: "Password", type: "password", value: password, setter: setPassword },
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-600">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                className="w-full mt-2 rounded-md bg-gray-400 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            className="w-full mt-4 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-700 font-semibold hover:text-gray-900">
              Log in
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-2 rounded-md bg-gray-400 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleVerifyOtp}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default Signup;
