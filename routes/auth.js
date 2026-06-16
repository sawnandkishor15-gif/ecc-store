import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// 1. SIGNUP ROUTE (Pehle se jo banaya tha)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

// 2. NEW LOGIN ROUTE 🔥
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation check
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Database me user ko dhoondhna
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(400).json({ message: "User not found! Please register first." });
        }

        // Password check (Abhi direct match kar rahe hain bina bcrypt ke, jaise aapne save kiya hai)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password! Please try again." });
        }

        // Sahi hone par user details bhej dena (bina password ke)
        return res.status(200).json({
            success: true,
            message: "🎉 Login successful!",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

export default router;
