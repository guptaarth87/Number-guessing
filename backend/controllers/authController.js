const bcrypt = require('bcrypt');
const User = require('../models/User');
const path = require('path');

// Index function to serve the HTML page
const Index = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Signup function to register a new user
const signup = async (req, res) => {
  console.log("sign up block");
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      password: hashedPassword,
      email,
      maxScore: 0
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login function to authenticate a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', status: 200, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500 });
  }
};

// Function to update the maxScore for a user
const updateMaxScore = async (req, res) => {
  try {
    const { email, newMaxScore } = req.body;

    // Find the user by email and update their maxScore
    const user = await User.findOneAndUpdate(
      { email }, // Filter by email
      { $set: { maxScore: newMaxScore } }, // Set new maxScore
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Max score updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTop10Users = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ maxScore: -1 }) // Sort by maxScore in descending order
      .limit(10); // Limit the results to 10 users

    res.status(200).json({ message: 'Top 10 users fetched successfully', topUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.status(200).json({
      message: 'User data fetched successfully',
      user
    });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login, Index, updateMaxScore, getTop10Users, getUserByEmail };
