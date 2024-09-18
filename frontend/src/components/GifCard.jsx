// GifCard.jsx
import React from 'react';

const GifCard = ({ gif, handleDelete }) => {
    // console.log("This is the GIF",gif);
  // Function to trigger GIF download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = gif.gifFile;
    link.download = `${gif?.title}.gif`;
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg relative group">
      <img
        src={gif?.gifFile}
        alt={gif?.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold">{gif?.title}</h3>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-60 flex justify-center items-center transition-all duration-300">
        <div className="space-x-4 opacity-0 group-hover:opacity-100">
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(gif?._id)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default GifCard;
