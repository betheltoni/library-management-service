import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// signup controller
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const saltRounds = 10;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        borrowedBooks: user.borrowedBooks,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all users controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.log("Error retrieving users:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get single user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    console.log("Error retrieving user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
