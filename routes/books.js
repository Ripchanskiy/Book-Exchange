const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Get all books
router.get('/', (req, res, next) => {
    Book.find({}, (error, books) => {
        if(error) {
            res.send('Error');
        } else { 
            res.json(books);
        }
    });
});

// Get single book by ID
router.get('/:id', (req, res, next) => {
    Book.findById(req.params.id, (error, book) => {
        if(error) { 
            throw error;
        } else {
            res.json(book);
        }
    })
});

// Add new book
router.post('/add', (req, res, next) => {
    
    let newBook = new Book({
        title: req.body.title,
        author: req.body.author
    });

    newBook.save(error => {
        if(error) {
            res.json({success: false, message: 'Failed to add book'});
        } else {
            res.json({success: true, message: 'Book added'})
        }
    });
})

// Delete book
router.delete('/:id', (req, res, next) => {
    Book.remove({_id: req.params.id }, (error) => {
        if(error) {
            res.json({success: false, message: "Could not remove book"});
        } else {
            res.json({success: false, message: "Book removed"});
        }
    })
});

module.exports = router;