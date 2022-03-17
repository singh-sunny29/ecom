const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
const productRoutes = require('./Routes/product');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/shopApp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false
})
    .then(()=>{
        console.log("Db connected")
    })
    .catch((err)=>{
        console.log('error!');
        console.log(err);
    })



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


app.use(session ({
    secret:'thisisnotagoodsecret',
    resave : false,
    saveUninitialized :true
}))

app.use(flash()); 

app.use((req, res, next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
// seedDB();

app.use(productRoutes);


app.get('/', (req, res)=>{
    res.send("This is the Landing page");
})





app.listen(3000, () =>{
    console.log('server running at port 3000');
})