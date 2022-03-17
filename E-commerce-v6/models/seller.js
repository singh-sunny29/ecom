const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');


const sellerSchema = new mongoose.Schema({

    info :{
        type:String,
        default:"seller"
    },
    email :{
        type: String,
        required :true,
        unique :true
    },
    products : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
});

sellerSchema.plugin(passportLocalMongoose);

 const Seller= mongoose.model('Seller', sellerSchema);

 module.exports = Seller;