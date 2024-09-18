import mongoose, { isValidObjectId } from "mongoose";
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { GIF } from "../models/gif.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

ffmpeg.setFfmpegPath('C:/ffmpeg/ffmpeg-2024-09-16-git-76ff97cef5-full_build/bin/ffmpeg.exe');


const getMygifs = asyncHandler(async (req,res) => {
const {userId}=req.params;
if(!userId){
  throw new ApiError(400,"Invalid user id")
}

const gifAggregate=await GIF.aggregate([
  {
    $match:{
      owner: new mongoose.Types.ObjectId(userId),
    }
  },
  {
    $lookup:{
      from:"users",
      localField:"owner",
      foreignField:"_id",
      as:"ownergifs",
      pipeline:[
        {
          $project:{
            username:1,
            fullname:1,
            _id:1,
          }
        }
      ]
    }
  },
  {
    $addFields:{
      ownergifs:{
        $first:"$ownergifs",
      }
    }
  }

])

if(!gifAggregate){
  throw new ApiError(400,"Error in fetching user's gif's ")
}

return res.status(200).json(new ApiResponse(201,gifAggregate,"User's uploaded gifs fetched successfully"))


});

const convertTogif = asyncHandler(async (req, res) => {
    const { startTime, endTime, title } = req.body;
    console.log(req.file);
    console.log(req.body);
    const videoPath = req.file.path;
    const gifPath = `public/temp/output.gif`;
  
    // Wrap ffmpeg processing in a promise
    const processVideoToGif = () => {
      return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .setStartTime(startTime) // Set start time for GIF
          .setDuration(endTime - startTime) // Set duration for GIF
          .output(gifPath)
          .on('end', () => resolve(gifPath)) // Resolve with gif path on success
          .on('error', (err) => reject(new ApiError(400,err.message || "Failed to process the video")))
          .run();
      });
    };
  
    try {
      // Wait for the GIF to be processed
      const processedGifPath = await processVideoToGif();
      console.log(processedGifPath);

      let gifFile;
      try {
        gifFile = await uploadOnCloudinary(processedGifPath);
        // console.log("Uploaded GIF File:", gifFile); // Debug the response from Cloudinary
      } catch (uploadError) {
        // console.error("Error uploading to Cloudinary:", uploadError);
        throw new ApiError(500, "Failed to upload GIF to Cloudinary");
      }
      const gif = await GIF.create({
        title: title,
        gifFile: gifFile.url,
        duration: gifFile.duration,
        owner: req.user?._id,
      });
  
      if (!gif) {
        throw new ApiError(500, "Something went wrong while creating the GIF entry");
      }
  
      // Send the response back to the client

      return res
      .status(200)
      .json(new ApiResponse(200, gifFile, "GIF created successfully"));
  
    } catch (error) {
      // Handle errors
      throw new ApiError(500, error.message);
    }
  });
  

const getgifById = asyncHandler(async (req, res) => {
  const { gifId } = req.params;
  if (!gifId) {
    throw new ApiError(400, "Invalid request");
  }

  const gif = await GIF.findById(gifId);
  if (!gif) {
    throw new ApiError(400, "Failed to fetch the video");
  }
  const fetchedgif = await GIF.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(gifId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullname: 1,
              _id: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, fetchedgif[0], "Video fetched successfully"));

  //TODO: get video by id
});

const deletegif = asyncHandler(async (req, res) => {
  const { gifId } = req.params;
  if (!gifId) {
    throw new ApiError(400, "Invalid delete-video request");
  }

  const gif = await GIF.findById(gifId);
  // console.log(video.owner,req.user?._id)
  if (String(gif.owner) !== String(req.user?._id)) {
    throw new ApiError(400, "This video is not published by you !!");
  }

  const delgif = await GIF.findByIdAndDelete(gifId,{new:true});

  if(!delgif){
    throw new ApiError(400,"Some error occured while deleting the gif")
  }

  const watchHistory = req.user?.gifHistory;
  let newwatchHistory = [];
  if (watchHistory.includes(gifId)) {
    newwatchHistory = watchHistory.filter((id) => id !== gifId);
  }

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        gifHistory: newwatchHistory,
      },
    },
    { new: true }
  );
  //TODO: delete video
  return res
    .status(201)
    .json(new ApiResponse(200, delgif, "Video deleted successfully"));
});



export {
  getgifById,
  deletegif,
  convertTogif,
  getMygifs
};
