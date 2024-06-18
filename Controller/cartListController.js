const cartList = require('../Models/cartListSchema')

exports.addToCartList = async (req, res) => {
    const { id, title, price, image,quantity } = req.body;
    const userId=req.payload
    try {
        // Check if the product id is already in the wishlist
        const cartitem = await cartList.findOne({ id ,userId});
        if (cartitem) {
            cartitem.quantity+=1
            cartitem.grandTotal=cartitem.quantity*cartitem.price
            await cartitem.save();

            res.status(200).json("product updated succesfully");
        } else {
            const cartNewproduct = new cartList({
                id,
                title,
                price,
                image,
                quantity,
                userId
            });
            
            cartNewproduct.grandTotal=cartNewproduct.quantity*cartNewproduct.price
            await cartNewproduct.save();
            res.status(200).json("Product added successfully");
        }
    } catch (error) {
        res.status(404).json(error); // Use the correct error object here
    }
};


exports.getCartList= async(req,res)=>{
    const userId=req.payload
    try {
        const cartListProduct = await cartList.find({userId})
        if(cartListProduct){
            res.status(200).json(cartListProduct)
        }else{
            res.status(400).json("product not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// delete

exports.deleteCartList=async(req,res)=>{
    const {id}=req.params
    const userId= req.payload
    try{
        const deleteItem=await cartList.deleteOne({id})
        if(deleteItem){
            const cartlist=await cartList.find({userId})
            res.status(200).json(cartlist)
        }
    }catch(err){
        res.status(404).json(err)
    }
}

// increment

exports.incrementCart=async(req,res)=>{
    const {id}=req.params
    const userId=req.payload
    try {
        const incrementCartProduct= await cartList.findOne({id,userId})
        // if the product already exist, then increment the product quantity by one and update the price accordingly
        if(incrementCartProduct){
            incrementCartProduct.quantity+=1
            incrementCartProduct.grandTotal=
            incrementCartProduct.price*incrementCartProduct.quantity
            // if its updated then store to mongodb
            await incrementCartProduct.save()
            // get all the products after updating
            const allCartProducts= await cartList.find({userId})
            res.status(200).json(allCartProducts)
        }else{
        res.status(402).json("item not found")
            
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

// decrement

exports.decrementCart=async(req,res)=>{
    const {id}=req.params
    const userId=req.payload
    try {
        const decrementCartProduct= await cartList.findOne({id,userId})
        // if the product already exist, then decrement the product quantity by one and update the price accordingly
        if(decrementCartProduct){
            decrementCartProduct.quantity-=1
            if(decrementCartProduct.quantity==0){
                // if the product is zero then delete the product cart
                const deleteCartProduct= await cartList.deleteOne({id})
                if(deleteCartProduct){
                    const allCartProducts= await cartList.find({userId})
                    res.status(200).json(allCartProducts)
                }
            }else{
                // if the product is not zero then update price accordingly

                decrementCartProduct.grandTotal=
                decrementCartProduct.price*decrementCartProduct.quantity
                // if its updated then store to mongodb
                await decrementCartProduct.save()
                // get all the products after updating
                const allCartProducts= await cartList.find({userId})
                res.status(200).json(allCartProducts)
            }
        }else{
        res.status(402).json("item not found")
            
        }
    } catch (error) {
        res.status(404).json(error)
    }
}
