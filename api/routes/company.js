const router = require("express").Router();
const Company = require("../models/Company");
const { verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");

// Add a company
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCompany = new Company({
        username: req.body.username,
        companyName: req.body.companyName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        phone: req.body.phone,
        address: req.body.address,
        logo: req.body.logo
    });
    try {
        const savedCompany = await newCompany.save();
        res.status(200).json(savedCompany);
    } catch (err) {
        res.status(500).json({ message: "Error saving company", error: err });
    }
});

// Update a company
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCompany);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a company
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.status(200).json("Company has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all companies
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
