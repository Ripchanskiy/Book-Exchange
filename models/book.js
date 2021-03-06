const mongoose = require('mongoose');
const config = require('../config/database');

const BookSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    condition: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    },
    postedOn: {
        type: Date,
        required: true
    },
    seller: {
        type: Object,
        required: true
    }  
});

const Book = module.exports = mongoose.model('Book', BookSchema)