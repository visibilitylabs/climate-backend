// boiler plate router code
import express from "express";
const router = express.Router();
import productRouter from "./product.js";
import orderRouter from "./order.js";
import couponRouter from "./coupon.js";
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/coupons", couponRouter);

router.use((req, res, next) => {
    res.send("Climate API");
});
export default router;