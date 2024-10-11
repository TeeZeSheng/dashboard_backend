const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator')

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],

    },
    price: {
        type: Number,
        required: [true, 'price cannot be empty'],
        min: 1
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;