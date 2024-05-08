const router  = require("express").Router();
const User = require("../models/User");
const Company = require("../models/Company");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//SIGN-UP
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            res.status(409).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.` });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

//SIGN-IN
router.post("/login", async(req,res)=>{

try{

    const  user = await User.findOne({username:req.body.username});

    if (!user) {
        res.status(401).json("WRONG CREDENTIALS!");
        return;
    }

    const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OGpassword = hashedPass.toString(CryptoJS.enc.Utf8);

    if (OGpassword !== req.body.password) {
        res.status(401).json("WRONG CREDENTIALS!");
        return;
    }

    const accessTkn = jwt.sign({
        id:user._id, 
        isAdmin:user.isAdmin,
    },
    process.env.JWT_SEC,
    {expiresIn:"3d"}
    );

    const {password, ...others} =user._doc;

return res.status(200).json({...others, accessTkn});

}catch(err){
return res.status(500).json(err)
}

})


// ADMIN SIGN IN

router.post("/adminlogin", async(req,res)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("Wrong credentials!");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials!");
        }

        if (!user.isAdmin) {
            return res.status(403).json("Access denied. Admins only.");
        }

        const accessTkn = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, { expiresIn: "3d" });

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessTkn });
    } catch (err) {
        return res.status(500).json(err);
    }
});


//COMPANY SIGN IN
router.post("/company-login", async(req, res) => {
    try {
        const company = await Company.findOne({ username: req.body.username });
        if (!company) {
            return res.status(404).json("Company not found");
        }

        const hashedPassword = CryptoJS.AES.decrypt(company.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        if (hashedPassword !== req.body.password) {
            return res.status(401).json("Wrong Credentials!");
        }

        const token = jwt.sign({
            id: company._id,
            isCompany: true
        }, process.env.JWT_SEC, { expiresIn: '3d' });
        

        const { password, ...others } = company._doc;
        return res.status(200).json({ ...others, token });

    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});



module.exports = router;