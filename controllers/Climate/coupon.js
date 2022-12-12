// create api for coupon and get coupon by id
import express from "express";
const router = express.Router();
import Coupon from "../../models/coupon.js";
// get all coupons
router.get("/", function(req, res) {
    Coupon.find(function(err, coupons) {
        if (err) {
            res.send(err);
        }
        res.json(coupons);
    });
});
// get a coupon
router.get("/:id", function(req, res) {
    try {
        Coupon.findById(req.params.id, function(err, coupon) {
            if (err) {
                res.send(err);
            }
            res.json(coupon);
        });
    } catch (error) {
        res.send(error)
    }
});
router.get("/code/:id", function(req, res) {
    try {
        Coupon.findOne({
            code: req.params.id
        }).exec(function(err, coupon) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(coupon);
        })
    } catch (error) {
        res.send(error)
    }
});

// add a coupon
router.post("/", function(req, res) {
    var coupon = new Coupon(req.body);
    coupon.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: "Coupon Added" });
    });
});
export default router;