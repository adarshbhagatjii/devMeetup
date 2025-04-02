import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./USerCard";
import { toast, ToastContainer } from "react-toastify";
import avatar from '../assets/avatar.png'

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
      setImageUrl(userData.imageUrl || null);
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
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:flex-row md:gap-6">
      <div className="w-full max-w-md bg-gray-200 rounded-xl shadow-xl p-4 mb-10">
        <h2 className="text-center text-2xl font-bold text-gray-700">Edit your profile</h2>
        <div className="mt-4 space-y-3">
          {[{ label: "First Name", value: firstName, setter: setFirstName },
            { label: "Last Name", value: lastName, setter: setLastName },
            { label: "Gender", value: gender, setter: setGender },
            { label: "Age", value: age, setter: (val) => setAge(Number(val)) },
            { label: "Bio", value: bio, setter: setBio },
            { label: "Image URL", value: imageUrl, setter: setImageUrl }].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-600">{field.label}</label>
              <input
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full rounded-md bg-gray-200 px-2 py-1 text-gray-700 placeholder-gray-400 focus:outline-gray-600 sm:text-sm"
              />
            </div>
          ))}
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={saveUpdate}
            className="w-full rounded-md bg-gray-600 px-2 py-2 text-white font-semibold hover:bg-gray-700 focus:outline-none"
          >
            Save
          </button>
        </div>
        <ToastContainer />
      </div>
      <div className="mt-6 md:mt-0">
        <div className="card w-80 bg-base-300 p-4 rounded-md flex flex-col items-center mx-3  mt-10 shadow-lg">
                <div className='w-[90%] h-50 bg-gray-500-600 rounded-md overflow-hidden'>
                {imageUrl ? (
                <img src={imageUrl} alt="User Avatar" className="w-full h-full rounded-xl object-cover" />
              ) : (
                <img src={avatar} alt="Default Avatar" className="w-full h-full rounded-xl object-cover" />
              )}
                
                </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{firstName+ ' '+ lastName}</h2>
            <h2 className="card-title">{age +' '+gender}</h2>
            <p>{bio}</p>
          </div>
        </div>
        {/* <UserCard user={{ firstName, lastName, age, gender, bio, imageUrl }} /> */}
      </div>
    </div>
    </>
  );
};

export default EditProfile;
