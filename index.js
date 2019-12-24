const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middleware
app.use(bodyParser.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

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