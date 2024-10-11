const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator')

const profitSchema = mongoose.Schema({
    profit: {
        type: Number,
        required: [true, 'cannot be empty'],
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const Profit = mongoose.model('Profit', profitSchema);

module.exports = Profit;