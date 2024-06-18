const wishlists = require('../Models/wishlistSchema');

exports.addToWishList = async (req, res) => {
    const { id, title, price, image } = req.body;
    const userId=req.payload
    try {
        // Check if the product id is already in the wishlist
        const item = await wishlists.findOne({ id,userId });
        if (item) {
            res.status(401).json("Product is already in the wishlist");
        } else {
            const product = new wishlists({
                id,
                title,
                price,
                image,
                userId
            });
            await product.save();
            res.status(200).json("Product added successfully");
        }
    } catch (error) {
        res.status(404).json(error); // Use the correct error object here
    }
};


exports.getWishList= async(req,res)=>{
    const userId=req.payload
    try {
        const wishlistProduct = await wishlists.find({userId})
        if(wishlistProduct){
            res.status(200).json(wishlistProduct)
        }else{
            res.status(400).json("product not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteWishList=async(req,res)=>{
    const {id}=req.params
    const userId= req.payload
    try{
        const deleteItem=await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlist=await wishlists.find({userId})
            res.status(200).json(wishlist)
        }
    }catch(err){
        res.status(404).json(err)
    }
}