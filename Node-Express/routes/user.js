const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// register
router.post("/register",async(req,res) => {
    const {name, email , password} = req.body;
    try {

        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({msg: 'User already exists'});
        }
        user = new User({name,email,password});
        await user.save();
        const payload = {user:{id:user.id}};
        const token = jwt.sign(payload,'mySecretKey',{expiresIn: '1h'});
        res.json({token,message: 'User Register Successfully.'});

    } catch(err) {
        res.status(500).send('server error')
    }
});

// login
router.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try {

        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({msg: 'Invalid credential'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) 
        {
            return res.status(400).json({msg: 'Invalid credential'});
        }
        const payload = {user:{id: user.id}};
        const token = jwt.sign(payload,'mySecretKey',{expiresIn: '1h'});
        res.json({token,mesaage:'User Logged-In Successfully.'})

    } catch(err) {
   res.status(500).send('Server error');
    }
});

//update user profile
router.put("/update",auth,async(req,res)=> {
    const {name,email,password} = req.body;
    try {
        let user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({msg: 'User Not Found'});
        }
        if(name) user.name = name;
        if(email) user.email = email;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
        }
        await user.save();
        res.json({msg: 'User profile updated successfully..',user});

    } catch(err) {
        res.status(500).send('Server error');
    }
});

//get profile
router.get('/me',auth,async(req,res) => {
    try {

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

    } catch(err) {
     res.status(500).send('Server error');
    }
});

//delete User
router.delete('/delete',auth,async(req,res) => {

    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({message:"User Deleted Successfully.."});

    } catch(err) {
        res.status(500).send({message:"server error"});
    }
});

//getallUser
const adminAuth = (req,res,next) => {
    
if(req.user.role !== 'admin') {
    return res.status(403).json({message:'access denied:Admin only'});
}
next();
};


router.get('/all',[auth,adminAuth],async(req,res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch(err) {
        res.status(500).send('Server error');
    }
});
module.exports = router;