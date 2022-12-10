import mongoose from "mongoose";
const Schema = mongoose.Schema;
const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    discount: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    discountType: String,
    maxDiscount: Number,
    minValue: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;