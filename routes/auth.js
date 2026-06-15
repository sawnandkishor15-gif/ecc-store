import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation check
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: "User registered successfully!" 
        });
    } catch (error) {
        // 🚨 YEH LINE REAL ERROR BHEJEGI FRONTEND KO
        res.status(500).json({ message: error.message }); 
    }
});

export default router;
