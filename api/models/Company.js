const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    companyName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {type: String, required: true},
    address:{ type: String, required: true},
    logo: {type: String, required:true}, // URL to the company logo image
}, { timestamps: true });

module.exports = mongoose.model("Company", CompanySchema);
