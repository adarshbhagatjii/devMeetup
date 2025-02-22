import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./USerCard";
import { toast, ToastContainer } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  
  // 🔹 Get user from Redux store
  const storedUser = useSelector((state) => state.user);

  // 🔹 Local state for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // 🔹 Fetch user data on mount if Redux store is empty
  useEffect(() => {
    if (storedUser?.firstName) {
      setFirstName(storedUser.firstName);
      setLastName(storedUser.lastName);
      setGender(storedUser.gender);
      setAge(storedUser.age);
      setBio(storedUser.bio);
      setImageUrl(storedUser.imageUrl);
    } else {
      fetchUserData();
    }
  }, [storedUser]); // Runs only when `storedUser` updates

  // 🔹 Fetch user data from API
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      const userData = res.data.data;
      dispatch(addUser(userData));

      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setGender(userData.gender);
      setAge(userData.age);
      setBio(userData.bio);
      setImageUrl(userData.imageUrl);
    } catch (err) {
      console.log("Failed to load user data.");
    }
  };

  // 🔹 Save updated profile
  const saveUpdate = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName,
        age,
        gender,
        bio,
        imageUrl,
      }, { withCredentials: true });

      dispatch(addUser(res.data.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-auto w-96 flex-1 flex-col justify-center mt-2 px-1.5 py-1.5 lg:px-8 bg-gray-800 rounded-xl shadow-xl">
            <h2 className="text-center text-2xl font-bold text-indigo-600">Edit your profile</h2>
            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label className="block text-sm font-medium text-gray-500">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full rounded-md bg-gray-400 px-1.5 py-1.5 text-base text-gray-800 outline-none placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full rounded-md bg-gray-400 px-1.5 py-1.5 text-base text-gray-800 outline-none placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block w-full rounded-md bg-gray-400 px-1.5 py-1.5 text-base text-gray-800 outline-none placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="block w-full rounded-md bg-gray-400 px-1.5 py-1.5 text-base text-gray-800 outline-none placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Bio</label>
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="block w-full rounded-md bg-gray-400 px-1.5 py-1.5 text-base text-gray-800 outline-none placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Image URL</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="block w-full rounded-md bg-gray-400 px-1.5 py-1.5 text-base text-gray-800 outline-none placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <p className="text-red-500 text-sm">{error}</p>
              <div className="mt-5 mb-5">
                <button
                  onClick={saveUpdate}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-1.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-indigo-600"
                >
                  Save
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard user={{ firstName, lastName, age, gender, bio, imageUrl }} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
