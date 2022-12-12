// create an api for get all orders and get order by id
import express from 'express';
const router = express.Router();
import Order from '../../models/order.js';
// get all orders


// get razorpay api key
router.get('/razorpay', function(req, res) {
    try {
        res.json({
            key: process.env.RAZORPAY_API_KEY,
        });

    } catch (error) {
        res.json({
            data: {},
            message: error.message,
        });
    }
});
router.get('/', function(req, res) {

    const filter = req.query.filter || null;
    if (filter) {
        Order.find({ status: filter }, function(err, orders) {
            if (err) {
                res.send(err);
            }
            res.json(orders);
        });
    } else
        Order.find(function(err, orders) {
            if (err) {
                res.send(err);
            }
            res.json(orders);
        });
});
// get an order
router.get('/:id', function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

// add an order
router.post('/', function(req, res) {
    let orderData = req.body;
    var order = new Order(orderData);
    const options = {
        amount: order.finalTotal * 100,
        currency: "INR",
        receipt: order._id.toString(),

    }
    order.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Order Added' });
    });
});
router.delete('/', function(req, res) {
    Order.remove(function(err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Order Deleted' });
    });
})
export default router;