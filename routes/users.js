const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const multer = require('multer');
const path = require('path');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Failed to register user'});
        } else {
            res.json({success: true, message: 'Added user'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (error, user) => {
        if(error) throw error;
        if(!user) {
           return res.json({success: false, message: "User not found"});
        }

        User.comparePassword(password, user.password, (error, isMatch) => {
            if(error) throw error;
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 Week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, message: 'Wrong password'});
            }
        })
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Image Uploading
// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/users/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// Init Upload
const upload = multer({
    storage: storage
}).single('image');

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(req.file);
        }
    })
})


module.exports = router;