const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');


router.get('/products', async (req, res) =>{
    try{
        const products = await Product.find({});
        res.render('products/index',{ products});
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error','Cannot find products');
        res.render('error');
    }
    
})

router.get('/products/new',isLoggedIn, (req, res)=>{

    res.render('products/new');
})

router.post('/products',isLoggedIn, async (req,res) =>{
    try{
        await Product.create(req.body.product);

        req.flash('success','product added successfully');
    
        res.redirect('/products');
    }
    catch(e){
        console.log("e.message");
        req.flash('error','Cannot add new products');
        res.render('error');
    }
})

router.get('/products/:id', async (req,res)=>{
    try{
        const product= await Product.findById(req.params.id).populate('reviews');
        res.render('products/show',{product});
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error','Cannot find product');
        res.render('error');
    }
})

router.get('/products/:id/edit',isLoggedIn, async (req,res)=>{
    const product= await Product.findById(req.params.id);
    res.render('products/edit', { product});

})

router.patch('/products/:id',isLoggedIn, async (req,res)=>{
    try{
        await Product.findByIdAndUpdate(req.params.id, req.body.product);

        req.flash('success','Details updated successfully');

        res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error','Cannot find product');
        res.render('error');
    }
})

router.delete('/products/:id',isLoggedIn, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success','product deleted successfully');
        res.redirect('/products');
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error','Cannot find product');
        res.render('error');
    }
})

router.post('/products/:id/review',isLoggedIn, async (req,res)=>{
    const product= await Product.findById(req.params.id);
    const review = new Review({
        user : req.user.username,
        ...req.body
    })

    product.reviews.push(review);

    await review.save();
    await product.save();

    res.redirect(`/products/${req.params.id}`);
})

module.exports = router;