// create api for books
import express from "express";
const router = express.Router();
import Book from "../models/book.js";
// get all books
router.get("/", async function(req, res) {
    const pageNo = req.query.pageNo || null;
    const pageSize = req.query.pageSize || null;
    const sortBy = req.query.sortBy || null;
    let books;
    if (pageNo && pageSize) {
        switch (sortBy) {
            case "popularityIndex":
                books = await Book.find()
                    .sort({ popularityIndex: -1 })
                    .skip((pageNo - 1) * pageSize)
                    .limit(pageSize);
                break;
            case "currentPrice":
                books = await Book.find()
                    .sort({ currentPrice: 1 })
                    .skip((pageNo - 1) * pageSize)
                    .limit(pageSize);
                break;
            case "previousPrice":
                books = await Book.find()
                    .sort({ previousPrice: 1 })
                    .skip((pageNo - 1) * pageSize)
                    .limit(pageSize);
                break;
            default:
                books = await Book.find()
                    .sort({ popularityIndex: -1 })
                    .skip((pageNo - 1) * pageSize)
                    .limit(pageSize);
        }
        return res.json({
            data: books,
        });
    } else {
        books = await Book.find().sort({ popularityIndex: -1 });
        // console.log(books, "Coming down");

        return res.json({
            data: books,
        });
    }
});
// get a book
router.get("/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.json({
            data: book,
        });
    } catch (error) {
        return res.json({
            data: {},
            message: error.message,
        });
    }
});
// add a book
router.post("/", async(req, res) => {
    var book = new Book(req.body);
    await book.save();
    return res.send({
        message: "Book saved succesfully",
    });
});
// update a book
router.put("/:id", async function(req, res) {
    const book = await Book.findById(req.params.id);

    for (prop in req.body) {
        book[prop] = req.body[prop];
    }
    // save the book
    await book.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: "Book updated!" });
    });
});
// delete a book
router.delete("/:id", async function(req, res) {
    await Book.remove({
        _id: req.params.id,
    });
    if (err) {
        res.send(err);
    }
    res.json({ message: "Successfully deleted" });
});

// get books based on query string
router.get("/category/:query", async function(req, res) {
    const query = req.params.query;
    const pageNo = req.query.pageNo || null;
    const pageSize = req.query.pageSize || null;
    await Book.find({ categories: query }).skip((pageNo - 1) * pageSize).limit(pageSize).exec(function(err, books) {
        if (err) {
            res.send(err);
        }
        res.json({ data: books });
    });
});

// get books based on query string
router.get("/search/:query", async function(req, res) {
    const query = req.params.query;
    await Book.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
        ],
    }).exec(function(err, books) {
        if (err) {
            res.send(err);
        }
        res.json(books);
    });
});

export default router;