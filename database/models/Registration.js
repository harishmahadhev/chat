const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    registerDate: Date
})

const demandSchema = new Schema({
    course: String,
    counter: { type: Number, default: 1 }
})

const couponSchema = new Schema({
    course: String,
    link: String,
})

const Registration = mongoose.model('registration', registrationSchema);
const Demand = mongoose.model('demand', demandSchema);
const Coupon = mongoose.model('coupon', couponSchema);


module.exports = { Registration, Demand, Coupon }