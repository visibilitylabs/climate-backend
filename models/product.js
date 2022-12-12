import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    currentPrice: Number || String,
    previousPrice: Number || String,
    popularityIndex: {
        // Basic sorting based on popularity
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: "",
    },
    coverImage: String,
    availableQuantity: {
        type: Number,
        default: 100,
    },
    categories: {
        type: [String],
        default: [], // simple bestseller tag
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;