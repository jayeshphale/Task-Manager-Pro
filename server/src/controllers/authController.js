import bcrypt from "bcryptjs";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../services/tokenService.js";

// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);

    throw new Error("All fields are required");
  }

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);

    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);

    throw new Error("Invalid credentials");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);

    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// GET PROFILE
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});