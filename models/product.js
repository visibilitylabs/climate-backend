import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
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

const Book = mongoose.model("Book", bookSchema);

export default Book;
