import React from "react";
import { useState } from "react";
import { AiFillDelete, AiOutlineDownload } from "react-icons/ai";
const GifCard = ({ gif, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg relative group">
      <img
        src={gif?.gifFile}
        alt={gif?.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{gif?.title}</h3>
        <div>
          <button onClick={handleModalOpen}>
            <AiOutlineDownload className="text-2xl" />
          </button>
          <button onClick={() => handleDelete(gif?._id)}>
            <AiFillDelete className="text-2xl" />
          </button>
        </div>
        {/* <button>DELETE</button> */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={handleModalClose}
            >
              <h1 className="text-white text-3xl">✕</h1>
            </button>
            <img src={gif?.gifFile} alt={gif?.title} className="max-w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GifCard;
