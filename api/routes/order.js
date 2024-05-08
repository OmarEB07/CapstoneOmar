const Order = require("../models/Order");
const { verifyToken , verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router  = require("express").Router();

//CREATE ORDER

router.post("/", verifyToken, async (req,res)=>{

const newOrder = new Order(req.body);

try{

const savedOrder = await  newOrder.save();
res.status(200).json(savedOrder);

}catch(err){

res.status(500).json(err);
 
}

});


//UPDATE ORDER 

router.put("/:id",verifyTokenAndAdmin, async (req,res)=>{
  

try{
const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
    $set: req.body
},{new:true})

res.status(200).json(updatedOrder);
}

catch(err){
res.status(500).json(err);
}

 });



//REMOVE ORDER
router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
      try{
       await Order.findByIdAndDelete(req.params.id);
       res.status(200).json("ORDER HAS BEEN REMOVED...");
      }catch(err){
res.status(500).json(err);
      }
});


//GET ORDERS OF USER
router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
     const orders =  await Order.find({userId: req.params.userId});

     return res.status(200).json(orders);

    }
    
    catch(err){
res.status(500).json(err);
    }
});


//GET ALL 
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);

    }catch(err){
        res.status(500).json(err);

    }

});

// GET MONTHLY REVENUE



router.get("/income",verifyTokenAndAdmin, async (req,res)=> {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); 
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1)); 
try{

const income = await Order.aggregate([
    {$match: {createdAt: {$gte: prevMonth}}},
    {$project:{
        month:{$month: "$createdAt"},
        sales: "$amount",

    },
},

{
    $group:{
        _id:"$month",
        total: { $sum: "$sales" },
    },
},
]);
console.log(`prevMonth: ${prevMonth}, lastMonth: ${lastMonth}`);
console.log(income);
res.status(200).json(income);
}catch(err){
    console.error(err);
res.status(500).json(err); 
}

});


module.exports = router;