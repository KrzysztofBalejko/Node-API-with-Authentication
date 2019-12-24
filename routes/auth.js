const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { registerValidation, loginValdiation } = require('../validation');


router.post('/register', async (req,res) => {

    // Validating data
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the db
    const emailExist = await User.findOne({
        email: req.body.email 
    });
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    // Creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

    // Validating data
    const { error } = loginValdiation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the db
    const user = await User.findOne({
        email: req.body.email 
    });
    if(!user) return res.status(400).send('Email not found');
    
    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    res.send('Logged in');

});


module.exports = router;