const Product = require("../models/Product");
const { verifyToken , verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router  = require("express").Router();


//CREATE PRODUCT with company check
router.post("/", verifyToken, async (req, res) => {
    if (req.user.isCompany || req.user.isAdmin) {
        const newProduct = new Product({
            ...req.body,
            companyId: req.user.id  // Set the company ID from the authenticated user
        });

        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized to add products");
    }
});




//UPDATE PRODUCT with company check
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json("Product not found");

        if (product.companyId.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json("You can only update your own products");
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


//REMOVE PRODUCT
router.delete("/:id",verifyToken, async(req,res)=>{
      try{
       await Product.findByIdAndDelete(req.params.id);
       res.status(200).json("PRODUCT HAS BEEN REMOVED...");
      }catch(err){
res.status(500).json(err);
      }
});


//GET PRODUCT
router.get("/find/:id", async(req,res)=>{
    try{
     const product =  await Product.findById(req.params.id);

     return res.status(200).json(product);

    }
    
    catch(err){
res.status(500).json(err);
    }
});

//search product
router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.q;
        let products = await Product.find({
            title: { $regex: searchQuery, $options: "i" }, // This line makes the search case-insensitive
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});









router.get("/", async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qcompany = req.query.companyId;

 
     try{
     let products;
     if(qNew){
         products = await Product.find().sort({createdAt: -1}).limit(1);
     }else if (qCategory){
         products = await Product.find({
             categories:{
          $in:[qCategory], 
         },
     });
 
     }else if (qcompany ){
        products = await Product.find({
            companyId:{
                $in:[qcompany],
            },
        });
     }
     
     
     else{
         products = await Product.find();
     }
 
      return res.status(200).json(products);
 
     }
     
     catch(err){
 res.status(500).json(err);
     }
 });


 
module.exports = router;