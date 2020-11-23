import mongoose, { model } from 'mongoose';
import { productsType } from '../types';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: false },
});

export default model<productsType>("Products", productSchema);