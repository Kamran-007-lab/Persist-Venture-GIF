import React, { useState, useEffect } from "react";
import GifCard from "../components/GifCard";
import LoggedNavbar from "../components/LoggedNavbar";
import { useParams } from "react-router-dom";

const MyGifs = () => {
  const initialGifs = [];

  const [gifs, setGifs] = useState(initialGifs);
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    const getGifs = async () => {
      //API call
      const response = await fetch(
        `http://localhost:8000/api/v1/gifs/mygifs/${userId}`,
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
        console.log(json.data);
        setGifs(json.data);
        // setVideo(json.data.videos);
        // console.log(video);
      } else {
      }
    };
    getGifs();
  }, []);

  // Handle delete
  const handleDelete = async (gifId) => {
    const response = await fetch(`http://localhost:8000/api/v1/gifs/${gifId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    if (json.success) {
      // getGifs();
    //   console.log(json.data);
      const updatedGifs = gifs.filter((gif) => gif._id !== json.data._id);
      setGifs(updatedGifs);
    } else {
    }
  };

  return (
    <>
      <LoggedNavbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            My GIFs Collection
          </h1>

          {/* GIF Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gifs.map((gif) => (
              <GifCard key={gif?._id} gif={gif} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGifs;
