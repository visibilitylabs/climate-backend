import mongoose, { Mongoose } from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    // orderNumber: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     minlength: 3
    // },

    cartItems: [Object],
    total: Number,
    instructions: String,
    coupon: String,
    discount: Number,
    maxDiscount: Number,
    modeOfPayment: String,
    shipping: Number,
    finalTotal: Number,
    address: {
        name: String,
        email: String,
        phone: String,
        address: String,
        pin: String,
    },
    userId: Number,
    razorpay_payment_id: String,
    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: true,
});
const Order = mongoose.model('Order', orderSchema);
export default Order;