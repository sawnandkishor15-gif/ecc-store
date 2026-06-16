import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// 1. GET ALL PRODUCTS (Sabhi products dekhne ke liye)
router.get('/', async (req, res) => {
    try {
        const { category, filter } = req.query;
        let queryObj = {};

        if (category) queryObj.category = category;
        if (filter) queryObj.tag = filter;

        const products = await Product.find(queryObj);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. SEED PRODUCTS (Pehli baar database me sample products bharne ke liye)
router.post('/seed', async (req, res) => {
    try {
        // Agar database me pehle se products hain toh clear kar dega dummy data se bachne ke liye
        await Product.deleteMany({}); 

        const sampleProducts = [
            { title: "Classic Elegant Gown", price: 2999, category: "Women", tag: "best", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" },
            { title: "Premium Slim Fit Suit", price: 4999, category: "Men", tag: "best", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500" },
            { title: "Luxury Chronograph Watch", price: 8999, category: "Watches", tag: "trending", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500" },
            { title: "Leather Sneakers", price: 2499, category: "Shoes", tag: "new", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
            { title: "Designer Leather Handbag", price: 3499, category: "Accessories", tag: "sale", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" }
        ];

        await Product.insertMany(sampleProducts);
        res.status(201).json({ message: "Database seeded with dynamic products successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
