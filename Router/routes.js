const express = require('express')
const productController = require('../Controller/productController')
const userController = require('../Controller/userController')
const jwtMiddleware=require('../Middleware/jwtMiddleware')
const wishlistController=require('../Controller/wishListController')
const cartListController=require('../Controller/cartListController')

const router = express.Router()

// getallProducts

router.get('/allproducts',productController.getAllProducts)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/viewproduct/:id',productController.viewProducts)
router.post('/addtowishlist',jwtMiddleware,wishlistController.addToWishList)
router.get('/getwishlist',jwtMiddleware,wishlistController.getWishList)
router.delete('/deletewishlist/:id',jwtMiddleware,wishlistController.deleteWishList)

router.post('/addtocartlist',jwtMiddleware,cartListController.addToCartList)
router.get('/getcartlist',jwtMiddleware,cartListController.getCartList)
router.delete('/deletecartlist/:id',jwtMiddleware,cartListController.deleteCartList)
router.get('/incrementcart/:id',jwtMiddleware,cartListController.incrementCart)
router.get('/decrementcart/:id',jwtMiddleware,cartListController.decrementCart)

module.exports = router