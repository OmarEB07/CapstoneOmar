const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        products:[
            {
                productId:{
                    type:String
                },

                title:{
                    type:String
                },
                quantity:{
                   type:Number,
                   default:1, 
                },
                categories:{
                    type:Array,
                },

            }
        ],
        amount:{type:Number, required:true},
        address:{type:Object},
        status:{type:String, default:"pending"},
        
     
},

{timestamps:true}


);

module.exports= mongoose.model("Order", OrderSchema)