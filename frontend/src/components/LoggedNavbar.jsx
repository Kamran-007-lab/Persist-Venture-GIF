import React from "react";
import { Link, useNavigate } from "react-router-dom";



const LoggedNavbar = ({userId}) => {
    // console.log(userId);
    let navigate = useNavigate();
//   function errormessage(message) {
//     let dropdown = document.getElementById("errormessage");
//     dropdown.innerHTML = message;
//     dropdown.classList.toggle("hidden");
//   }
  const handleLogout = async () => {
    const response = await fetch("http://localhost:8000/api/v1/users/logout", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      // Handle error response
      console.log(response);
      const errorText = await response.text();
      console.error("Error response:", errorText);
    //   errormessage("Failed to log out");
      return;
    }

    const json = await response.json();
    if (json.success) {
      console.log("hello");
      navigate("/");
    } else {
      console.log("errrrrrr");
    //   errormessage(json.error);
    }
  };

  return (
    <nav className="bg-gradient-to-br from-gray-500 via-white to-gray-100  shadow-2xl shadow-black w-full z-10">
      <div className=" max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Company Name */}
          <div className="flex-shrink-0">
            <h1 className="text-5xl  text-gray-800 font-signature mt-2">
              Persist Ventures
            </h1>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to={`/MyGifs/${userId}`}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium"
            >
              My GIFs
            </Link>
            <Link
              
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium"
            >
              Change Password
            </Link>
            <Link
              
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium"
            >
              Premium
            </Link>
            <Link
              
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;
