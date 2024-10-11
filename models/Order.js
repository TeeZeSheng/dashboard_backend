const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator')

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],

    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    price: {
        type: Number,
        required: [true, 'price cannot be empty'],
        min: 1
    },
    quantity: {
        type: Number,
        required: [true, 'quantity cannot be empty']
    },
    location: {
        type: String,
        required: [true, 'location cannot be empty']
    },
    date: {
        date: {
            type: Date,
            default: Date.now,
        }
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;