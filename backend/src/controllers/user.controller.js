import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const at = user.generateAccessToken();
    const rt = user.generateRefreshToken();

    user.refreshToken = rt;
    await user.save({ validateBeforeSave: false });
    return { at, rt };
  } catch (error) {
    throw new ApiError(
      500,
      "Something wnet wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log(fullname);
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // console.log("After creation error 34");
  const existedUser = await User.findOne({
    // $or:[]
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "Someone with this username/email already exists");
  }

  // console.log("After creation error 44");
  const user = await User.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
  });
  // console.log("After creation error 51");
  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // console.log("After creation error 55");
  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return res.status(201).json({createduser}) This is also correct but not structured
  return res
    .status(201)
    .json(new ApiResponse(201, createduser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, username, password } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Please sign up before trying to log in");
  }

  // vp=valid password

  const vp = await user.isPasswordCorrect(password);

  if (!vp) {
    throw new ApiError(404, "Invalid user credentials");
  }

  const { at, rt } = await generateAccessRefreshToken(user._id);

  //To not send password to the user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpsOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", at, options)
    .cookie("refreshToken", rt, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken: at,
          refreshToken: rt,
        },
        "User logged in sucessfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpsOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //irt=incoming refresh token

  const irt = req.cookies.refreshToken || req.body.refreshToken;

  if (!irt) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(irt, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (irt !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { at, rt } = await generateAccessRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", at, options)
      .cookie("refreshToken", rt, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken: at,
            refreshToken: rt,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  //ipc
  const ipc = await user.isPasswordCorrect(oldPassword);

  if (!ipc) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log(req.user);
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const getgifHistory = asyncHandler(async(req,res) => {
  // console.log(typeof(req.user._id));
  const user=await User.aggregate([
    {
      $match :{
        _id: new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $lookup :{
          from: "gifs",
          localField:"gifHistory",
          foreignField:"_id",
          as:"gifHistory",
          pipeline: [
            {
              $lookup :{
                from: "users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline: [
                  {
                    $project:{
                        fullname: 1,
                        username:1,
                    }
                  }
                ]
              }
            },
            {
              $addFields:{
                owner:{
                  $first:"$owner"
                }
              }
            }
          ]
      }
    }
  ])
  // console.log("abcd");
  return res.status(200).json(new ApiResponse(200,user[0].gifHistory,"GIF history fetched successfully"))



})



export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  getgifHistory
};
// export loginUser;
