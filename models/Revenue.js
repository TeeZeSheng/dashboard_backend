const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator')

const revenueSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],

    },
    price: {
        type: Number,
        required: [true, 'price cannot be empty'],
        min: 1
    },
    location: {
        type: String,
        required: [true, 'location cannot be empty']
    },
    date: {
        type: Date,
        default: Date.now,
    }
    
})

const Revenue = mongoose.model('Revenue', revenueSchema);

module.exports = Revenue;