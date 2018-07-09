const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

const books = require('./routes/books');
const users = require('./routes/users');

// Connect to Database
const config = require('./config/database')
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (error) => {
    console.log('Database error: ' + error);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/books', books);
app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started on port ' +port);
})