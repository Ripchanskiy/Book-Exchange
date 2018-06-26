const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
});

router.post('/authenticate', (req, res, next) => {

});

router.get('/profile', (req, res, next) => {
    res.send('Profile');

});

module.exports = router;