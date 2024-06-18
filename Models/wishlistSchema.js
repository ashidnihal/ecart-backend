const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
            type:String,
            required:true,
            
    },
    price:{
        type:String,
        required:true
    } 
    ,
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const wishlist= mongoose.model('wishlist',wishListSchema)
module.exports=wishlist