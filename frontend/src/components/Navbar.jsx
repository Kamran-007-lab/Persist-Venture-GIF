import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Company Name */}
          <div className="flex-shrink-0">
            <h1 className="text-5xl  text-gray-800 font-signature mt-2">Persist  Ventures</h1>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">Login</a>
            <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">Signup</a>
            <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">Premium</a>
            <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">Careers</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
