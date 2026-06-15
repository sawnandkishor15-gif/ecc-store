// routes/auth.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// 📝 SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // Create new user (Direct saving for now, we will add encryption later)
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: "User registered successfully on cloud database!",
            user: { name, email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
