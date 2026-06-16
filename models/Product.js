import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String, default: 'best' }, // best, new, trending, sale
    description: { type: String, default: 'Premium quality luxury apparel.' }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
