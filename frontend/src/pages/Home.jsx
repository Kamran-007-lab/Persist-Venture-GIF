// HomePage.jsx
import React, { useState, useEffect } from "react";
import LoggedNavbar from "../components/LoggedNavbar";
import VideoUploadSection from "../components/VideoUploadSection";
import GifDisplaySection from "../components/GifDisplaySection";

const HomePage = () => {
  const [gifData, setGifData] = useState(null); // Store the GIF data
  const [userId, setUserId] = useState(null); // Store the current user

  useEffect(() => {
    const getCurrentUser = async () => {
      // API call to get current user
      const response = await fetch(
        "http://localhost:8000/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json.success) {
        setUserId(json.data._id); // Set user ID in state
        // console.log(json.data._id);
      } else {
        console.log("Failed to fetch user");
      }
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {/* Pass `user` as a prop to LoggedNavbar */}
      <LoggedNavbar userId={userId} />

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl text-center mb-8 font-typewrite">
            Video to GIF Generator
          </h1>

          {/* Video Upload Section */}
          <VideoUploadSection setGifData={setGifData} />

          {/* Gif Display Section */}
          {gifData && <GifDisplaySection gifData={gifData} />}
        </div>
      </div>
    </>
  );
};

export default HomePage;
