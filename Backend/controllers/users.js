const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

// Signup

exports.signup = async (req, res) => {
  console.log("Incoming request body:", req.body);  // Log the entire body

  const { email, username, password, role } = req.body;

  // Input validation
  if (!email || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
          email,
          username,
          password: hashedPassword,
          role
      });

      await user.save();
      res.status(201).json({ message: "User created successfully" });
  } catch (err) {
      console.error("Error during user creation:", err.stack); // Full error stack
      res.status(500).json({ message: "Error creating user", error: err.message });
  }
};



// Signin
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
        user.token = token;
        await user.save();

        // Return token and user data
        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: "Error signing in", error: err });
    }
};


// Logout
exports.logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.token = null;
        await user.save();

        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error logging out", error: err });
    }
};

// CRUD Operations
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
};
