import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
import User from './models/User';
import { connectDB } from './db/db';
import { verifyToken } from './middleware/auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    res.status(201).json({ message: 'User registered', user_id: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred while signing up' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user_id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Resume Analyzer (Protected)
app.post('/resume-analyzer', verifyToken, async (req, res) => {
  try {
    const user_id = (req as any).user?.user_id;
    const { resumeText } = req.body;

    const { data } = await axios.post('http://localhost:5000/api/resume-analyzer', {
      user_id,
      resumeText,
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred while analyzing resume' });
  }
});

// Chatbot (Protected)
app.post('/chatbot', verifyToken, async (req, res) => {
  try {
    const user_id = (req as any).user?.user_id;
    const { message } = req.body;

    const { data } = await axios.post('http://localhost:5000/api/chatbot', {
      user_id,
      message,
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error communicating with chatbot' });
  }
});

// Cover Letter Generator (Protected)
app.post('/cover-letter', verifyToken, async (req, res) => {
  try {
    const user_id = (req as any).user?.user_id;
    const { jobDescription } = req.body;

    const { data } = await axios.post('http://localhost:5000/api/cover-letter', {
      user_id,
      jobDescription,
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating cover letter' });
  }
});

// Roadmap Generator (Protected)
app.post('/roadmap', verifyToken, async (req, res) => {
  try {
    const user_id = (req as any).user?.user_id;
    const { career_goal } = req.body;

    const { data } = await axios.post('http://localhost:5000/api/roadmap', {
      user_id,
      career_goal,
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating roadmap' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
