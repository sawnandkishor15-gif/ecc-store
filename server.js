import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 10000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🎰 DHYAN SE RE-CHECK KAREIN: Apna asli password bina < > ke likhein
// Agar password mein special chars hain toh yeh best hai
const dbUser = "adz_admin";
const dbPass = "adzadmin123"; // <-- YAHAN APNA ASLI PASSWORD DAALEIN
const dbCluster = "cluster0.8id9g6b"; // <-- Ek baar MongoDB Atlas me Cluster ID check kar lena yahi hai na?

const MONGO_URI = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPass)}@${dbCluster}.mongodb.net/adz_fashion?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI)
.then(() => console.log("🎰 ADZ Fashion Database Connected Successfully via Cloud!"))
.catch((err) => console.log("❌ DB Connection Error: ", err));

// ROUTES
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: "active", message: "Operational!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
