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
   


module.exports = {  isLoggedIn ,isSellerLoggedIn};