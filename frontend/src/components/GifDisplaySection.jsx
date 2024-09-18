import React, { useState } from 'react';

const GifDisplaySection = ({ gifData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl shadow-black items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Generated GIF</h2>
      <div className='items-center '>
      <div className='items-center flex justify-center'>
        <img
          src={gifData.gifUrl}
          alt={gifData.title}
          className="cursor-pointer w-72"
          onClick={handleModalOpen}
        />
        </div>
        <p className="mt-2 text-gray-700 text-center">Title: {gifData.title}</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={handleModalClose}
            >
              ✕
            </button>
            <img src={gifData.gifUrl} alt={gifData.title} className="max-w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GifDisplaySection;
