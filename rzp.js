import Razorpay from 'razorpay';

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.RAZORPAY_API_KEY);


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});