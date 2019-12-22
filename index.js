const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

// Import routes
const authRoute = require('./routes/auth');

// Middleware
app.use(bodyParser.json());
app.use('/api/user', authRoute);


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connnect to db
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    options,
    () => console.log('connected to DB !')
);

app.listen(3000, () => console.log("server up and running"));