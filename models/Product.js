const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],

    },
    price: {
        type: Number,
        required: [true, 'price cannot be empty'],
        min: 1
    },
    color: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        required: [true, 'Need to specify stock number'],
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;