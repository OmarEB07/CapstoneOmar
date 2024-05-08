const Cart = require("../models/Cart");
const { verifyToken , verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router  = require("express").Router();

//CREATE Cart

router.post("/", verifyToken, async (req, res) => {
    const { userId, products } = req.body; // Assume products is an array of product objects

    try {
        let cart = await Cart.findOne({ userId: userId });

        if (cart) {
            // User already has a cart, add new products or update existing ones in the cart
            products.forEach((newProduct) => {
                const itemIndex = cart.products.findIndex(item => item.productId == newProduct.productId);

                if (itemIndex > -1) {
                    // Product exists in cart, update quantity
                    cart.products[itemIndex].quantity += newProduct.quantity;
                } else {
                    // New product, add to cart
                    cart.products.push(newProduct);
                }
            });

            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } else {
            // No cart for user, create a new one
            const newCart = new Cart(req.body);
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE Cart 

router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
  

try{
const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
    $set: req.body
},{new:true})

res.status(200).json(updatedCart);
}

catch(err){
res.status(500).json(err);
}

 });



// DELETE Cart
router.delete("/:userId", verifyToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      const result = await Cart.deleteOne({ userId: userId });
      if(result.deletedCount === 0){
        return res.status(404).json("Cart not found.");
      }
      res.status(200).json("Cart has been removed.");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


//REMOVE Cart
router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
      try{
       await Cart.findByIdAndDelete(req.params.id);
       res.status(200).json("CART HAS BEEN REMOVED...");
      }catch(err){
res.status(500).json(err);
      }
});


//GET CART OF USER
router.get("/find/:userId", verifyToken,verifyTokenAndAuthorization, async(req,res)=>{
    const userId = req.params.userId;
    try{
     const cart =  await Cart.findOne({userId});

     return res.status(200).json(cart);

    }
    
    catch(err){
res.status(500).json(err);
    }
});


//GET ALL 
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);

    }catch(err){
        res.status(500).json(err);

    }

});



// Assuming you have a route set up like this
router.put('/:userId/remove', verifyToken,verifyTokenAndAuthorization, async (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body; // Assuming you send productId in the request body

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the product to remove
        const updatedProducts = cart.products.filter(product => product.productId !== productId);
        cart.products = updatedProducts;

        // Save the updated cart
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Failed to remove product from cart", error: error.message });
    }
});




module.exports = router;