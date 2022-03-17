const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const Review = require('../models/review');


router.get('/products', async (req, res) =>{
    const products = await Product.find({});
    res.render('products/index',{ products});
})

router.get('/products/new', (req,res)=>{

    res.render('products/new');
})

router.post('/products', async (req,res) =>{
    await Product.create(req.body.product);
    
    res.redirect('/products');
})

router.get('/products/:id', async (req,res)=>{
    const product= await Product.findById(req.params.id).populate('reviews');
    res.render('products/show',{product});
})

router.get('/products/:id/edit',async (req,res)=>{
    const product= await Product.findById(req.params.id);
    res.render('products/edit', { product});

})

router.patch('/products/:id', async (req,res)=>{
    await Product.findByIdAndUpdate(req.params.id, req.body.product);
    
    res.redirect(`/products/${req.params.id}`);
})

router.delete('/products/:id', async (req, res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
})

router.post('/products/:id/review', async (req,res)=>{
    const product= await Product.findById(req.params.id);
    const review = new Review(req.body);

    product.reviews.push(review);

    await review.save();
    await product.save();

    res.redirect(`/products/${req.params.id}`);
})

module.exports = router;