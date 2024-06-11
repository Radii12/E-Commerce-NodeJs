const mongoose = require("mongoose");

const productSchema=new mongoose.Schema({
    productName: {
        type:String,
        unique:true,
        trim:true,
        required:true,
        
        minlength: [3,"name is too short"],
        maxlength: [32,"name is too long"]
    },
     slug:{
        type:String,
        lowercase:true,
        // required:true
     },
     image: {
        type: String, 
    },
    priceAfterDiscount: {
        type: Number 
    },
    finalPrice: {
        type: Number , 
        required:true,
        max: [32,"price is too long"]

    },
    category: {
        type: mongoose.Schema.ObjectId ,
        ref:'category',
        required:true
    },
    stock: {
        type: Number, 
    },
},{timestamps:true});


 const Product = mongoose.model("Product", productSchema);

 module.exports = Product;