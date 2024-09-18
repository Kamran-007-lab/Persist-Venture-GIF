import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  let navigate=useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object using the form data after the form has been submitted
    const form = document.getElementById("form");
    const data = new FormData(form);
    const response = await fetch("http://localhost:8000/api/v1/users/register", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: data,
      credentials: 'include',
    });

    const json = await response.json();
    if (json.success) {
      //Redirect to My Profile page

      navigate("/Login");
    } else {
      errormessage(json.error);
      // console.log(json.error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="p-5  mb-8 border-dashed border-2 border-black rounded-3xl flex justify-center items-center h-5/6 w-9/12">
          <form
            id="form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="w-3/6 flex flex-col  "
          >
            <div className="text-5xl font-semibold tex justify-center items-center align-middle mt-4 mb-6 mx-auto  text-black font-fornavbar">
              Tell us about you !!
            </div>

            <div className="mb-6 ">
              <label
                htmlFor="username"
                className="mb-2 text-lg font-medium text-black dark:text-black"
              >
                Username
              </label>
              <input
                className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full p-2.5 border focus:ring-red-500 focus:border-red-500"
                type="username"
                id="username"
                name="username"
                placeholder="Select username"
                required
              />
            </div>

            <div className="mb-6 w-full mr-2">
              <label
                htmlFor="email"
                className="mb-2 text-lg font-medium text-black dark:text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="mb-2 text-lg font-medium text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="p-2 rounded-lg border w-full focus:ring-red-400 focus:border-red-400"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <br />

            <div className="flex flex- mx-auto w-full">
              <div className="mb-6 w-full">
                <label
                  htmlFor="fullname"
                  className="mb-2 text-lg font-medium text-black dark:text-black"
                >
                  Full Name
                </label>
                <input
                  type="fullname"
                  id="fullname"
                  name="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            

            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-black group-hover:from-white group-hover:to-black hover:text-black dark:text-black focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
              <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl">
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default CreateProfile;
