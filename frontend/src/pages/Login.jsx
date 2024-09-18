import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import loginimg from "../components/images/loginimg.webp";
// import VideoContext from "../context/VideoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  let navigate = useNavigate();
  //   const {video,setVideo,getVideo}=useContext(VideoContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  function errormessage(message) {
    let dropdown = document.getElementById("errormessage");
    dropdown.innerHTML = message;
    dropdown.classList.toggle("hidden");
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // console.log(password);
  // console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/users/login", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      // Handle error response
      console.log(response);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      errormessage("Sign up first !");
      return;
    }

    const json = await response.json();
    if (json.success) {
      console.log("hello");
      navigate("/Home");
    } else {
      console.log("errrrrrr");
      errormessage(json.error);
    }
  };

  return (
    <>
      <Navbar />

      {/* New section */}

      <section className=" min-h-screen flex items-center justify-center text-black bg-gray-100" >
        {/* <!-- login container --> */}
        <div className=" flex rounded-2xl shadow-2xl shadow-black max-w-3xl p-5 items-center bg-white">
          {/* <!-- form --> */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-3xl text-black ">Login</h2>
            <p className="text-sm mt-4 text-black">
              If you are a member, easily log in
            </p>

            <form
              action="post"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <input
                className="p-2 mt-8 rounded-xl border focus:ring-white focus:border-white"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                // value={credentials.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                {/* <input
                  className="p-2 rounded-xl border w-full focus:ring-white focus:border-white"
                  type="password"
                  id="password"
                  name="password"
                //   value={credentials.password}
                  placeholder="Password"
                //   onChange={onChange}
                  required
                /> */}
                <div className="relative">
                  <input
                    className="p-2 rounded-lg border w-full focus:ring-red-400 focus:border-red-400"
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                </div>

                {/* errormessage */}
                <div
                  className="text-sm text-center font-bold text-white py-2 hidden"
                  id="errormessage"
                ></div>
                {/* errormessage */}
                {/* password */}
              </div>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-2xl group bg-gradient-to-br from-white to-black group-hover:from-white group-hover:to-black hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg w-full">
                  Log In
                </span>
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              {/* <hr /> */}
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <br />
            <div className=" flex items-center justify-center">
              <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-2xl group bg-gradient-to-br from-white to-black group-hover:from-white group-hover:to-black hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg w-full">
                  Log In with Google
                </span>
              </button>
            </div>

            <div className="mt-5 text-xs border-b border-white py-4 text-black">
              {/* <Link to="/ForgotPass"> */}
              Forgot your password ?{/* </Link> */}
              {/* <a href="#">Forgot your password?</a> */}
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-black">
              <p className="text-black">New to Persist Ventures?</p>
              <button className="relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-black group-hover:from-white group-hover:to-black hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800 border-b border-black">
                <span className="relative px-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg w-full">
                  Register
                </span>
              </button>
            </div>
          </div>

          {/* <!-- image --> */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={loginimg} alt="Couple" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
