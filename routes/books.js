const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Get all books');
});

router.get('/:id', (req, res, next) => {
    res.send('Get one book');
});

router.post('/add', (req, res, next) => {
    
})

router.delete('/:id', (req, res, next) => {

});

module.exports = router;