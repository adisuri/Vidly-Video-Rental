//auth.js is for logging in user
//takes email and password

const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    //bcrypt will hash req.body.password and add the same salt and then compare with user.password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    //first argument is payload of web token, second argument is private key
    // const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'));

    const token = user.generateAuthToken();

    res.send(token);

});

function validate(req){
    const schema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
}

module.exports=router;