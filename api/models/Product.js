const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        description:{type:String, required:true, unique:true},
        img:{type:String, required:true},
        categories:{type:Array},
        type:{type:Array},
        console:{type:Array, default:"NA"},
        price:{type:Number, required:true},
        inStock:{type:Boolean, default:true},
        onSale:{type:Boolean,default:false},
        salePercentage: { 
            type: Number, 
            default: 0, 
            min: 0, // Minimum value allowed
            max: 1  // Maximum value allowed
          },
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' } // Link to the Company model



},

{timestamps:true}


);

module.exports= mongoose.model("Product", ProductSchema)