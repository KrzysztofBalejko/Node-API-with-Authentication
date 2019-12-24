const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { registerValidation } = require('../validation');


router.post('/register', async (req,res) => {

    // Validating data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the db
    const emailExist = await User.findOne({
        email: req.body.email 
    });
    if(emailExist) return res.status(400).send('Email already exists');

    // Creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});


module.exports = router;