// boiler plate router code
import express from "express";
const router = express.Router();
import bookRouter from "../controllers/book.js";
import orderRouter from "../controllers/order.js";
import couponRouter from "../controllers/coupon.js";
import ClimateRouter from "../controllers/Climate/index.js";
router.use("/books", bookRouter);
router.use("/orders", orderRouter);
router.use("/coupons", couponRouter);
router.use("/climate", ClimateRouter);
router.use((req, res, next) => {
    res.send("Hello I am coming");
});
export default router;