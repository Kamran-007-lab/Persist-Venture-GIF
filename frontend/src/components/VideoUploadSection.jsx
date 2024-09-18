import React, { useState } from "react";

const VideoUploadSection = ({ setGifData }) => {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    video: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Create FormData object using the form data after the form has been submitted
  //     const form = document.getElementById("form");
  //     const data = new FormData(form);
  //     const response = await fetch("http://localhost:8000/api/v1/users/register", {
  //       method: "POST",
  //       // headers: {
  //       //   "Content-Type": "multipart/form-data",
  //       // },
  //       body: data,
  //       credentials: 'include',
  //     });

  //     const json = await response.json();
  //     if (json.success) {
  //       //Redirect to My Profile page

  //       navigate("/Login");
  //     } else {
  //       errormessage(json.error);
  //       // console.log(json.error);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const data = new FormData(form);
    const response = await fetch("http://localhost:8000/api/v1/gifs/", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: data,
      credentials: "include",
    });

    const json = await response.json();
    if (json.success) {
      setGifData({
        title: formData.title,
        gifUrl: json.data.url,
      });
      //Redirect to My Profile page

      //   navigate("/Login");
    } else {
      errormessage(json.error);
      // console.log(json.error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl shadow-black mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title for GIF</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Time (seconds)</label>
          <input
            type="number"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Start time in seconds"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Time (seconds)</label>
          <input
            type="number"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="End time in seconds"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-black group-hover:from-white group-hover:to-black hover:text-black dark:text-black focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-green-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl">
            Generate
          </span>
        </button>
      </form>
    </div>
  );
};

export default VideoUploadSection;
