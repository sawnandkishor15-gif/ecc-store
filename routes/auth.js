import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if database is connected or buffering
        if (express.request.app && mongoose.connection.readyState !== 1) {
            return res.status(500).json({ message: "Database is still connecting. Please wait a moment!" });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // Save new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully!" 
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

export default router;
