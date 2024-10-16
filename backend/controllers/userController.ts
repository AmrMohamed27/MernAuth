import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc Auth User/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const reqUser = await User.findOne({ email });

  if (reqUser && (await reqUser.matchPassword(password))) {
    generateToken(res, reqUser._id.toString());
    res.status(201).json({
      _id: reqUser._id,
      name: reqUser.name,
      email: reqUser.email,
    });
  } else {
    res.status(401);
    throw new Error(`Invalid email or password`);
  }
});
// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User already exists`);
  }
  const newUser = await User.create({ name, email, password });

  if (newUser) {
    generateToken(res, newUser._id.toString());
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error(
      `Invalid user data \n name: ${name} \n email: ${email} \n password: ${password}`
    );
  }
});
// @desc Logout user
// @route POST /api/users/logout
// @access Public

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized: No User");
  }
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized: No User");
  }
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
