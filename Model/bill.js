const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: false,
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone number'],
        minLength: [11, 'Please enter a valid phone number'],
        maxLength: [11, 'Please enter a valid phone number'],

    },
    payableAmount: {
        type: Number,
        required: [true, 'Please enter a payable amount'],
    },
    date: {
        type: Date,
        default: Date.now,
    },




});

const bill = mongoose.model('Bill', billSchema);

module.exports = bill;
