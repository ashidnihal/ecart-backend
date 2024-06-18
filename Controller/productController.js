const products = require("../Models/productSchema");

// get all products
exports.getAllProducts = async (req, res) => {
  try {
   
    const allProducts = await products.find();
    res.status(200).json(allProducts);
 
} catch (err) {
    res.status(404).json(err);
  }
};





exports.viewProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const viewProducts = await products.findOne({ id }); // Await the query execution
    res.status(200).json(viewProducts);
  } catch (err) {
    res.status(404).json(err);
  }
};
