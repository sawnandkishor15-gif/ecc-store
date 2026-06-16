import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database Configuration
const dbUser = "adz_admin";
const dbPass = "adzadmin123"; // <-- Yahan apna password sahi se daalein
const dbCluster = "cluster0.8id9g6b"; 

const MONGO_URI = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPass)}@${dbCluster}.mongodb.net/adz_fashion?retryWrites=true&w=majority`;

// MongoDB Connection with Error Handling
mongoose.connect(MONGO_URI)
  .then(() => console.log("🎰 Database Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Error: ", err.message));

// Connection Event Listeners
mongoose.connection.on('error', err => {
  console.log('🚨 MongoDB runtime connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({ status: "active", message: "Production Engine is Operational!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Production Server running on port ${PORT}`);
});
