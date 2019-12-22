const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


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

// Import routes
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);


app.listen(3000, () => console.log("server up and running"));