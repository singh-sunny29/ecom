const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const Review = require('../models/review');
const Seller = require('../models/seller')
const { isLoggedIn, isSellerLoggedIn,isSpSellerLoggedIn } = require('../middleware');


router.get('/products', async (req, res) =>{
    try{
        const products = await Product.find({}).populate('seller');
        res.render('products/index',{ products});
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error','Cannot find products');
        res.render('error');
    }
    
})

router.get('/:sellerId/myproducts',isSellerLoggedIn, async(req, res) => {
    
    try {
        const seller=await Seller.findById(req.params.sellerId).populate('products');
        res.render('products/myproduct',{seller}); 
    } catch (e) {
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find Products');
        res.render('error');
    }
})

router.get('/products/new',isSellerLoggedIn, (req, res)=>{

    res.render('products/new');
})

router.post('/:sellerId/products',isSellerLoggedIn, async (req,res) =>{
    
    let seller=await Seller.findById(req.params.sellerId);
    try {
        const product=new Product({
            ...req.body.product,
            seller:req.user._id
        })
         
        const newproduct =await product.save();
        await seller.products.push(newproduct);
        await seller.save();
        req.flash('success', 'Product Created Successfully');
        res.redirect('/products');
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Create Products,Something is Wrong');
        res.render('error');
    }
})

router.get('/products/:id', async (req,res)=>{
    try{
        const product= await (await Product.findById(req.params.id).populate('reviews').populate('seller'));
        console.log(product);
        res.render('products/show',{ product });
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot find product');
        res.render('error');
    }
})


   

router.get('/products/:id/edit', isSpSellerLoggedIn, async(req, res) => {

    try {
        const product=await Product.findById(req.params.id);
        res.render('products/edit',{product});
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Edit this Product');
        res.redirect('/error');
    }
})

router.patch('/products/:id',isSpSellerLoggedIn, async (req,res)=>{
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

router.delete('/products/:id',isSpSellerLoggedIn, async (req, res)=>{
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