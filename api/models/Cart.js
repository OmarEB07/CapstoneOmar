const mongoose = require("mongoose");

const ProductDetailSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    categories:{type:Array, required:true},
    console: String,
    type: String,
    img:{type:String, required:true},
    onSale:{type:Boolean,default:false},
    salePercentage: { 
        type: Number, 
        default: 0, 
        min: 0, // Minimum value allowed
        max: 1  // Maximum value allowed
      }

    // Add any other product details you wish to store
}, { _id : false });

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [ProductDetailSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", CartSchema);
