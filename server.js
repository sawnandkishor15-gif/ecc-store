import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js'; // <-- 1. YEH LINE ADD KAREIN

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const dbUser = "adz_admin";
const dbPass = "adzadmin123"; // Apna real password rakhiyega
const dbCluster = "cluster0.8id9g6b"; 

const MONGO_URI = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPass)}@${dbCluster}.mongodb.net/adz_fashion?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI)
  .then(() => console.log("🎰 Database Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Error: ", err.message));

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // <-- 2. YEH LINE ADD KAREIN

app.get('/api/health', (req, res) => {
    res.json({ status: "active", message: "Production Engine is Operational!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Production Server running on port ${PORT}`);
});
