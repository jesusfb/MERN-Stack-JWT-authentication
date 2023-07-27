import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//public
const userAuth = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await user.matchPass(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Username or Password!");
  }
});

// public
const userRegister = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  const duplicateUser = await User.findOne({ username });

  if (duplicateUser) {
    res.status(400);
    throw new Error("Username already taken :(");
  }
  const user = await User.create({ name, username, password });
  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Soemthing went wrong");
  }
});

//private
const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

//private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name;
    user.username = req.body.username;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
    });
  } else {
    res.status(401);
    throw new Error("no user found");
  }
});

export {
  userAuth,
  userRegister,
  userLogout,
  getUserProfile,
  updateUserProfile,
};
