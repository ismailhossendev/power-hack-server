const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// import routes
const billRoute = require('./Route/billRoute');

//middleware
app.use(express.json());
app.use(cors());

//connect to db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

// routes middleware
app.use('/api', billRoute);


app.get('/', (req, res) => {
    res.send('We are on home');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});