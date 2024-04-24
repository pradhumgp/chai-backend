import { syncIndexes } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user is already exists - check by username,email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - creation entry in DB
  // remove password and refresh token from response
  // check for user creation
  // return response

  const { username, email, password, fullName } = req.body;
  // console.log(email, username);

  if([fullName, email, username, password].some((field)=>{
    return field?.trim() === ""
  })){
    throw new apiError(400, "All Fields are required")
  }

  const existingUser = await User.findOne({
    $or: [{ username },{ email }]
  })

  if(existingUser){
    throw new apiError(409, "User with email ir username already exists")
  }


  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if(!avatarLocalPath){
    throw new apiError(400, "Avatar File is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new apiError(400, "Avatar File is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new apiResponse(200, createdUser, "User registered successfully")
  )



});

export { registerUser };
