const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const dotenv = require("dotenv");
// dotenv.config();

const authentication = async (req, res, next) => {
    try{
        const token = req.cookies.jwttoken;
        if(token == undefined){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id:decoded._id,"tokens.token":token});
        if(!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        req.userid = user._id;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized"});
    }
}

module.exports = authentication;