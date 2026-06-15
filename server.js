// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// Security Guard Middlewares
app.use(cors());
app.use(express.json());
// Import route at the top
import authRoutes from './routes/auth.js';

// Add this below app.use(express.json());
app.use('/api/auth', authRoutes);


// ⚠️ SABSE IMP: Apni MongoDB connection string yahan paste karein password ke sath
const MONGO_URI = "mongodb+srv://adz_admin:adzadmin123@cluster0.mongodb+srv://adz_admin:<db_password>@cluster0.8id9g6b.mongodb.net/?appName=Cluster0.mongodb.net/adz_fashion?retryWrites=true&w=majority";


console.log('⏳ Triggering Connection with MongoDB Atlas...');

mongoose.connect(MONGO_URI)
    .then(() => console.log('🍃 MongoDB Cloud Cluster Connected Successfully!'))
    .catch(err => console.error('❌ Cloud Database Connection Failure:', err));

// Base System Health Check API Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "active",
        message: "ADZ Fashion Live Cloud Production Engine is Operational!",
        timestamp: new Date()
    });
});

// Dynamic Port Assignment for Render Cloud
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Production Server running on port ${PORT}`);
});
