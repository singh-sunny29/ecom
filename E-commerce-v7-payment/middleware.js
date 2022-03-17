const Product = require('./models/product');

const isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated())
    {
        req.flash('error','Looks like you have not logged in');
        return res.redirect('/login');
    }
    next();
}

const isSellerLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        if(req.user.info!=='seller'){
            req.flash('error','Looks like you have not logged in as a seller login first');
            return res.redirect('/sellerlogin');
    }
    next();
}
else{
    req.flash('error','username or password is incorrect');
            return res.redirect('/sellerlogin');
}
} 

const isSpSellerLoggedIn= async(req,res,next)=>{
    const product= await Product.findById(req.params.id)
   if(req.user.info=="seller" && req.user._id==product.seller){
       if(!req.isAuthenticated()){
           req.flash('error','You can Modify Only Your Products');
           return res.redirect(`${req.user._id}/myproducts`);
       }
       next();
   }
   else if(req.user.info=="seller" ){
       if(!req.isAuthenticated()){
           req.flash('error','You can Modify Only Your Products');
           return res.redirect(`${req.user._id}/myproducts`);
       }
   }
   else{
       req.logout();
       req.flash('error','Only Seller can Acess this!! If You are a Seller,Kindly Login with Seller ID');
       return res.redirect('/loginseller');
   }
   
}
   


module.exports = {  isLoggedIn ,isSellerLoggedIn ,isSpSellerLoggedIn};