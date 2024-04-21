import { syncIndexes } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  const { username, email, passowrd, fullName } = req.body;
  console.log(email, username);
});

export { registerUser };
