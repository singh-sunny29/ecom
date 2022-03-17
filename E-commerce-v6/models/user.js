const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product=require('./product');

const userSchema = new mongoose.Schema({
    info :{
        type:String,
        default:"user"
    }, 
    email :{
        type: String,
        required :true,
        unique :true
    }
    
});

userSchema.plugin(passportLocalMongoose);

 const User= mongoose.model('User', userSchema);

 module.exports = User;