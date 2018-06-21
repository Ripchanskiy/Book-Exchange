const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const books = require('./routes/books');

const port = 3000;

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api/books', books);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started on port ' +port);
})