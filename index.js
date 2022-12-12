// boiler plate express app code with mongoose, router and cors
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";
import bookModel from "./models/book.js";
import { sampleData } from "./Data/SampleData.js";
import { sampleDataClimate } from "./Data/SampleDataClimate.js";
import pkg from 'jsonwebtoken';
import Book from "./models/book.js";
import LogEvent from "./models/logEvent.js";
import Product from "./models/product.js";
const { verify } = pkg;
const app = express();
const port = process.env.PORT || 5000;

// connect to mongodb
mongoose.connect(
    "mongodb+srv://ankur:ankur@cluster0.s70w8.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
);

// middleware

// app.use(async(req, res, next) => {
//     Product.deleteMany().exec();
//     sampleDataClimate.forEach(async(item) => {
//         const newBook = new Product({
//             // ...item,
//             currentPrice: +item.currentPrice || 0,
//             previousPrice: +item.previousPrice || 0,
//             coverImage: item.coverImage,
//             title: item.title,
//             description: item.description,
//             isOnSale: true,
//             categories: item.categories,
//         });
//         await newBook.save();
//     });
//     res.send("done");
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    "/admin",
    async(req, res, next) => {
        const { headers } = req;
        if (!headers["authorization"]) {
            return res.status(401).json({
                message: "Authorization",
            });
        }
        const token = headers["authorization"];
        const verified = verify(token, "ASDFASDFASDFASDFASDF@##Rfdgop");

        if (!verified) {
            return res.status(401).json({
                message: "Authenticated",
            });
        }
        next();
    },
    router
);
app.post('/event', async(req, res) => {
    try {
        const event = new LogEvent(req.body);
        await event.save();
        res.send({ message: "Event Logged" });
    } catch (error) {
        res.send(error);
    }
})
app.get('/event', async(req, res) => {
    try {
        const events = await LogEvent.find();
        res.send(events);
    } catch (error) {
        res.send(error);
    }
})
app.use("/", router);

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});