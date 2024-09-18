import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar, FaRegStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review: "This GIF maker is amazing! Super easy to use and fast.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review: "I love how I can create GIFs from my videos in just a few clicks!",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Lee",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review: "The best tool out there for creating high-quality GIFs from videos.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review: "Excellent interface and very user-friendly. Highly recommend!",
    rating: 4,
  },
  {
    id: 5,
    name: "Emilia Clarke",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review: "I love this GIF tool! Super fast and efficient.",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Sonam Chauhan",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review: "The new pexel in the market !",
    rating: 4,
  },
  {
    id: 7,
    name: "Javed Hassan",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    review: "Exquisite Just exquisite !",
    rating: 5,
  },
  {
    id: 8,
    name: "Zoya Khan",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    review: "Excellent interface and very user-friendly. Highly recommend!",
    rating: 5,
  },
];

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(1); // Start with the second review in the center

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex justify-center mb-2">
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <FaStar key={index} className="text-yellow-500 text-xl" />
          ) : (
            <FaRegStar key={index} className="text-yellow-500 text-xl" />
          )
        )}
      </div>
    );
  };

  return (
    <div className=" bg-gray-100">
      <h1 className="text-5xl md:text-7xl font-typewrite items-center text-center mb-5 pt-16">
        Discover a World of Endless Entertainment !!
      </h1>
      <h2 className="text-3xl font-bold text-black">
            <TypeAnimation
              sequence={[
                "Why watch a video when you can GIF it?",
                2000,
                "",
                2000,
              ]}
              speed={50}
              className=" text-3xl font-light items-center text-center font-typewrite"
              wrapper="h2"
              repeat={Infinity}
            />
          </h2>

      {/* <h2 className="text-3xl font-light items-center text-center font-typewrite">
        Why watch a video when you can GIF it?
      </h2> */}

      <div
        id="carousel"
        className={`relative w-full max-w-5xl mx-auto mt-4 overflow-hidden py-12`}
      >
        {/* Carousel Wrapper */}
        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{
            // Adjusted to translate the carousel so the active review stays centered
            transform: `translateX(-${(current * (100 / 3)) - 100 / 3}%)`,
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`flex-none w-1/3 p-6 transition-opacity duration-500 ease-in-out transform ${
                index === current
                  ? "opacity-100 scale-100"
                  : "opacity-50 scale-90"
              }`}
            >
              {/* Outer Container */}
              <div
                className={`relative w-full h-full bg-white text-center shadow-2xl shadow-black rounded-lg`}
              >
                {/* User Image */}
                <img
                  className="w-24 h-24 rounded-full mx-auto mt-4 mb-4"
                  src={review.image}
                  alt={review.name}
                />
                {/* Stars */}
                {renderStars(review.rating)}
                <p className="text-gray-800 text-lg font-semibold mb-2">
                  {review.review}
                </p>
                <h3 className="text-blue-600 text-md font-medium">
                  - {review.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Arrow */}
        <div style={{top:"42%"}}
          className="absolute left-1 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600"
          onClick={handlePrev}
        >
          <IoIosArrowBack size={40} />
        </div>

        {/* Next Arrow */}
        <div style={{top:"42%"}}
          className="absolute right-1 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600"
          onClick={handleNext}
        >
          <IoIosArrowForward size={40} />
        </div>
        <div className="flex justify-center gap-20 px-4 mt-10">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-black group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="text-lg relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Get started !! sign up now
            </span>
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-white to-black group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="text-lg relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Existing user ?? Login
            </span>
          </button>
        </div>
      </div>
       
    </div>
  );
};

export default ReviewCarousel;
