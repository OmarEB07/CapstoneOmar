const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                console.log(err); // Add this line for debugging

                // Here you can handle specific token errors
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json("Token has expired");
                    
                } else {
                    return res.status(403).json("Token is not valid"+ err.message);
                }
            }
            req.user = user; // If no error, the token is good, and user info is attached to the request
            next(); // Proceed to the next middleware/route handler
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("UserID from token:", req.user.id);
        console.log("UserID from params:", req.params.userId);
        console.log("Is Admin:", req.user.isAdmin);

        // Check if the user is performing an action on their own account or if they are an admin
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Forbidden Request!");
        }
    });
};





//const verifyTokenAndAuthorization = (req,res,next)=>{
   // console.log("UserID from token:", req.user.id);
    //console.log("UserID from params:", req.params.userId);
    //console.log("Is Admin:", req.user.isAdmin);

    //if (req.user.id === req.params.userId || req.user.isAdmin) {
      //  next();
    //} else {
      //  res.status(403).json("Forbidden Request !");
//    }
//};




const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin ){
        next();
        }else{
            res.status(403).json("Forbidden Request !");
        } 
    })
};







module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};