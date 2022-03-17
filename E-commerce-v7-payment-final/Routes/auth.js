const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Seller = require('../models/seller')
const passport = require('passport');
const Product = require('./product');



router.get('/register', async (req,res)=>{
    res.render('auth/signup');
})

router.post('/register', async (req, res)=>{
    try{
        const user = new User(
            {   firstname: req.body.firstname,
                lastname:req.body.lastname,
                username: req.body.username, 
                email: req.body.email 
            });
        const newUser =await User.register(user, req.body.password);
        req.flash('success','Registered successfully');
        res.redirect('/login');
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
})

router.get('/login', (req, res) =>{
    res.render('auth/login');
})

router.post('/login',
            passport.authenticate('user',
            {
                failureRedirect:'/login',
                failureFlash:true
            }),
            (req, res) =>{
                req.flash('success','welcome');
                res.redirect('/products');
            }
    
)

router.get('/sellerregister',async (req,res)=>{
    res.render('auth/sellerSignup');
})

router.post('/sellerregister', async (req,res)=>{
    try{
        const seller = new Seller({
            firstname: req.body.firstname,
            lastname:req.body.lastname,
            username: req.body.username,
             email: req.body.email ,
             address:req.body.address,
             state:req.body.state,
             pincode:req.body.pincode
           
           });
        const newSeller =await Seller.register(seller, req.body.password);
        req.flash('success','Registered successfully');
        res.redirect('/sellerlogin');
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/sellerregister');
    }
})

router.get('/sellerlogin',async (req,res)=>{
    res.render('auth/sellerlogin');
})

router.post('/sellerlogin',
            passport.authenticate('seller',
            {
                failureRedirect:'/sellerlogin',
                failureFlash:true
            }),
            (req, res) =>{
                req.flash('success','welcome');
                res.redirect('/products');
            }
    
)

router.get('/logout', (req,res)=>{
    
    req.logout();
    req.flash('success','Logged out successfully');
    res.redirect('/login');
})



module.exports = router;