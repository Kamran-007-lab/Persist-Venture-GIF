// HomePage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import VideoUploadSection from '../components/VideoUploadSection';
import GifDisplaySection from '../components/GifDisplaySection';

const HomePage = () => {
  const [gifData, setGifData] = useState(null); // Store the GIF data

  return (
  <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-center mb-8 font-typewrite">Video to GIF Generator</h1>
        
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
