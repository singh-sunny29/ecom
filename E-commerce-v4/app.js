const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
const productRoutes = require('./Routes/product');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');


const userRoutes = require('./Routes/auth');
//authentication using passport
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//connect mongoose to mongodb
mongoose.connect('mongodb://localhost:27017/shopApp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
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
//to use coonnect-flah, we require session
//to use session we need this middleware
const sessionConfig = {
    secret:'thisisnotagoodsecret',
    resave : false,
    saveUninitialized :true
}

app.use(session (sessionConfig));

//initialize passport and session

app.use(passport.initialize());
app.use(passport.session());

//config passport to use local-strategy
passport.use(new LocalStrategy(User.authenticate()));

//serialize & deserialize user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to use connect-flash
app.use(flash()); 

//properties set to  locals are available to all tempelates
app.use((req, res, next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})
seedDB();

app.use(productRoutes);
app.use(userRoutes);


app.get('/', (req, res)=>{
    res.send("This is the Landing page");
})





app.listen(3000, () =>{
    console.log('server running at port 3000');
})