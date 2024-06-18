const mongoose = require('mongoose')

const cartListSchema = new mongoose.Schema({
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
    },
    quantity:{
        type:Number,
        required:true  
    },
    grandTotal:{
        type:Number,
        required:true 
    }
})

const cartList= mongoose.model('cartList',cartListSchema)
module.exports=cartList