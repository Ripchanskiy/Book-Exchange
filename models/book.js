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
    /*
    description: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
    */
    
});

const Book = module.exports = mongoose.model('Book', BookSchema)