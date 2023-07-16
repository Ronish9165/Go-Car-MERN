const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");

const User = require('../models/userSchema');
const Rentcart = require('../models/rentcartSchema');

module.exports = router.get('/getRentCartData', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const findUserById = findUser._id;

    await Rentcart.findOne({userById: findUserById})
    .populate('userById')
    .then((cartData) => {
        return res.status(200).json({cartData});
    })
    .catch((error) => {
        return res.status(400).json({error: error});
    })
    

    
});